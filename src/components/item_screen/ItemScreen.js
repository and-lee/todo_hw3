import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

export class ItemScreen extends Component {
    state = {
        description: this.props.item.description,
        assigned_to: this.props.item.assigned_to,
        due_date: this.props.item.due_date,
        completed: this.props.item.completed,
    }

    updateChange = (e) => {
        const { target } = e;

        if (target.id == "completed") {
            this.setState(state => ({
                ...state,
                [target.id]: target.checked,
            }));
        } else {
            this.setState(state => ({
                ...state,
                [target.id]: target.value,
            }));
        }
        
    }

    newKey() {
        for(let i=0; i<this.props.todoList.items.length; i++) {
            if(this.props.todoList.items.find(function(item){return item.key==i})==null) {
                return i;
            }
        }
        return this.props.todoList.items.length;
    }

    handleSubmit = (e) => {
        let itemList = this.props.todoList.items;
        
        // add new item
        if(this.props.item.key==-1) { // new item
            console.log("New Item: ");            
            // add new item to back
            itemList.push({
                "description": this.state.description,
                "assigned_to": this.state.assigned_to,
                "due_date": this.state.due_date,
                "completed": this.state.completed,
                "key": this.newKey(), // assign new key value
                "id": itemList.length,
            });

        } else { // editing item
            console.log("Edit Item: ");
            let itm = itemList[itemList.indexOf(this.props.item)];
            itm.description = this.state.description;
            itm.assigned_to = this.state.assigned_to;
            itm.due_date = this.state.due_date;
            itm.completed = this.state.completed;
        }

        // update database
        const fireStore = getFirestore();
        fireStore.collection("todoLists").doc(this.props.todoList.id).update( {
            items : itemList
        });
        this.props.history.goBack();
    }


    render() {
        const auth = this.props.auth;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <h4 className="grey-text text-darken-3" id="todoItemHeader">Item</h4>
                
                <div className="input-field">
                    <label className="active">Description</label>
                    <input 
                        type="text"
                        id="description"
                        onChange={this.updateChange}
                        value={this.state.description} />
                </div>
                    
                <div className="input-field">
                    <label className="active">Assigned To</label>
                    <input 
                        type="text"
                        id="assigned_to"
                        onChange={this.updateChange}
                        value={this.state.assigned_to} />
                </div>

                <div className="input-field">
                    <label className="active">Due Date</label>
                    <input 
                        type="date"
                        id="due_date" 
                        onChange={this.updateChange}
                        value={this.state.due_date} />
                </div>

                <div>
                    <label>
                        <input type="checkbox" className="filled-in" checked={this.state.completed}
                            onChange={this.updateChange} id="completed"/>
                        <span className="statusLabel black-text">Completed</span>
                    </label>
                </div>

                <div id="editItemButtons">
                    <button className="btn waves-effect waves-light"
                        onClick={this.handleSubmit}>Submit
                        <i className="material-icons right">flight_takeoff</i>
                    </button>

                    &nbsp;

                    <button className="btn waves-effect waves-light grey lighten-1"
                        onClick={() => this.props.history.goBack()}>Cancel
                        <i className="material-icons right">airplanemode_inactive</i>
                    </button>
                </div>
                    
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {todoLists} = state.firestore.data;
    const {id} = ownProps.match.params;
    const todoList = todoLists ? todoLists[id] : null;
    const {itemid} = ownProps.match.params;
    const item = (itemid != "new") ? todoList.items[itemid] : {
            "description": "",
            "due_date": "",
            "assigned_to": "",
            "completed": false,
            "key": -1, // new item = has no id
        };

    todoList.id = id;
    item.id = itemid;
    return {
        item,
        todoList,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(ItemScreen);