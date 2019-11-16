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

    handleSubmit = (e) => {
        let itemList = this.props.todoList.items;

        let item = itemList[this.props.item.id];
        item.description = this.state.description;
        item.assigned_to = this.state.assigned_to;
        item.due_date = this.state.due_date;
        item.completed = this.state.completed;

        // ADD NEW ITEM, GIVE NEW ID
        /*if(this.props.todoItem.key==null) { // new item
            this.props.todoItem.key = this.newKey(); // assign key value
            this.props.todoItem.description = this.state.description;
            this.props.todoItem.assigned_to = this.state.assigned_to;
            this.props.todoItem.due_date = this.state.due_date;
            this.props.todoItem.completed = this.state.completed;
            
            //this.props.todoList.items.push(this.props.todoItem); // add new item
            let transaction = new addItem_Transaction(this.props.todoList, this.props.todoItem);
            this.props.jsTPS.addTransaction(transaction);
        } else { // editing item
            let transaction = new editItem_Transaction(this.props.todoItem, this.state.description, this.state.assigned_to, this.state.due_date, this.state.completed);
            this.props.jsTPS.addTransaction(transaction);
        }
        */

        // update database
        const fireStore = getFirestore();
        fireStore.collection("todoLists").doc(this.props.todoList.id).update( {
            items : itemList
        });
        this.props.history.goBack()
    }


    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        const item = this.props.item;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Item</h5>
                    <div id="item_description_prompt" className="item_prompt">Description:</div>
                    <input className="item_input"
                        type="text"
                        id="description"
                        defaultValue={this.props.item.description}
                        onChange={this.updateChange}
                        value={this.state.description} />
                    
                    <div id="item_assigned_to_prompt" className="item_prompt">Assigned To:</div>
                    <input className="item_input"
                        type="text"
                        id="assigned_to"
                        defaultValue={this.props.item.assigned_to}
                        onChange={this.updateChange}
                        value={this.state.assigned_to} />
                    
                    <div id="item_due_date_prompt" className="item_prompt">Due Date:</div>
                    <input className="item_input"
                        type="date"
                        id="due_date" 
                        defaultValue={this.props.item.due_date}
                        onChange={this.updateChange}
                        value={this.state.due_date} />
                    
                    <div>
                        <label>
                        <input type="checkbox" class="filled-in" checked={this.state.completed}
                        onChange={this.updateChange} id="completed"/>
                        <span className="black-text">Completed</span>
                        </label>
                    </div>

                    <footer>
                        <button class="btn waves-effect waves-light" type="submit" name="action"
                            onClick={this.handleSubmit}>Submit
                            <i class="material-icons right">flight_takeoff</i>
                        </button>

                        &nbsp;

                        <button  class="btn waves-effect waves-light" type="submit" name="action"
                            onClick={() => this.props.history.goBack()}>Cancel
                            <i class="material-icons right">airplanemode_inactive</i>
                        </button>
                    </footer>
                
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {todoLists} = state.firestore.data;
    const {id} = ownProps.match.params;
    const todoList = todoLists ? todoLists[id] : null;
    const {itemid} = ownProps.match.params;
    const item = todoList.items[itemid];
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