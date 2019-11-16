import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                <div className="row listheader z-depth-1 grey darken-2 white-text">
                    <div className="col s4">Task</div>
                    <div className="col s3 dateHeader">Due Date</div>
                    <div className="col s2">Status</div>
                </div>

                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <Link to={'/todoList/' + todoList.id + "/" + item.id} key={item.id}>
                            <ItemCard todoList={todoList} item={item} />
                        </Link>
                        
                    );})
                }

                <div className="card z-depth-1 light-green lighten-4" id="addItemCard">
                    <i className="material-icons" id="addItemCardContent">add_box</i>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);