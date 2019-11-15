import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

export class ItemScreen extends Component {
    state = {
        description: this.props.item.description,
        assigned_to: this.props.item.assigned_to,
        due_date: this.props.item.due_date,
        completed: this.props.item.completed,
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (

            <div className="container white">
                <h5 className="grey-text text-darken-3">Item</h5>
                    <div id="item_description_prompt" className="item_prompt">Description:</div>
                    <input 
                        defaultValue={this.props.item.description}
                        onChange={e => this.updateDescription(e.target.value)}
                        id="item_description_textfield" className="item_input" type="input" />
                    
                    <div id="item_assigned_to_prompt" className="item_prompt">Assigned To:</div>
                    <input 
                        defaultValue={this.props.item.assigned_to}
                        onChange={e => this.updateAssignedTo(e.target.value)}
                        id="item_assigned_to_textfield" className="item_input" type="input" />
                    
                    <div id="item_due_date_prompt" className="item_prompt">Due Date:</div>
                    <input 
                        defaultValue={this.props.item.due_date}
                        onChange={e => this.updateDueDate(e.target.value)}
                        id="item_due_date_picker" className="item_input" type="date" />
                    
                    <div id="item_completed_prompt" className="item_prompt">Completed:</div>
                    <input 
                        defaultChecked={this.props.item.completed}
                        onChange={e => this.updateCompleted(e.target.checked)}
                        id="item_completed_checkbox" className="item_input" type="checkbox" />

                    <footer>
                        <button id="item_form_submit_button" className="input_button item_button" 
                            onClick={this.handleSubmit}>Submit</button>
                        &nbsp;
                        <button id="item_form_cancel_button" className="input_button item_button"
                            onClick={() => this.props.loadList(this.props.todoList)}>Cancel</button>
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