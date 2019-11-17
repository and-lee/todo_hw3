import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

class ItemsList extends React.Component {

    handleAdd = (e) => {
        //let itemList = this.props.todoList.items;
        let newItem = {
            "description": "",
            "due_date": "",
            "assigned_to": "",
            "completed": false,
            "key": "new", // new item = has no id
        }
        /*itemList.push({
            "description": "",
            "due_date": "",
            "assigned_to": "",
            "completed": false,
            "key": "new", // new item = has no id
        });*/

        return newItem;
        //console.log("Add: item.id: " + this.props.item);
        /*const fireStore = getFirestore();
        fireStore.collection("todoLists").doc(this.props.todoList.id).update( {
                items : itemList
        });*/
        

        // go to edit item screen
        //this.props.history.push("/todolist/" + this.props.todoList.id + "/" + this.props.todoList.items.id );
    }

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
                    //item.id = item.key;
                    item.id = items.indexOf(item);
                    return (
                        <Link to={'/todoList/' + todoList.id + "/" + item.id} key={item.key}>
                            <ItemCard todoList={todoList} item={item} />
                        </Link>
                        
                    );})
                    /*item.id = item.key;
                    return (
                        <Link to={'/todoList/' + todoList.id + "/" + item.id} key={item.key} index={items.indexOf(item)}>
                            <ItemCard todoList={todoList} item={item} />
                        </Link>
                    );})*/
                }

                <div className="card z-depth-1 light-green lighten-4" id="addItemCard">
                    <Link to={'/todoList/' + todoList.id + "/" + "new"}>
                        <i className="material-icons" id="addItemCardContent">add_box</i>
                    </Link>
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