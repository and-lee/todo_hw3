import React from 'react';
import Button from 'react-materialize/lib/Button';
import Icon from 'react-materialize/lib/Icon';
import { getFirestore } from 'redux-firestore';

class ItemCard extends React.Component {

    handleMove = (e,x) => {
        let index = this.props.todoList.items.indexOf(this.props.item);
        let itemList = this.props.todoList.items;
        itemList[index] = this.props.todoList.items[index+x];
        itemList[index+x] = this.props.item;

        //console.log("Move: item.id: " + this.props.item);
        const fireStore = getFirestore();
        fireStore.collection("todoLists").doc(this.props.todoList.id).update( {
                items : itemList
        });
        e.preventDefault();
    }

    handleDelete = (e) => {
        let itemList = this.props.todoList.items;
        itemList = itemList.filter(i => i != this.props.item);

        console.log("Delete: item.id: " + this.props.item);
        const fireStore = getFirestore();
        fireStore.collection("todoLists").doc(this.props.todoList.id).update( {
                items : itemList
        });
        e.preventDefault();
    }

    render() {
        const { item } = this.props;
        
        return (
            <div className="card itemCard z-depth-1 todo-list-link light-green lighten-3">
                <div className="card-content black-text text-darken-3">

                    <div className="row">
                        <span className="col s12 card-title">{item.description}</span>
                        
                            <div className='col s4 list_item_card_assigned_to'>
                                Assigned To: <span className = "assigned_to">{item.assigned_to}</span>
                            </div>
                            <div className='col s3 list_item_card_due_date'>
                                {item.due_date}
                            </div>
                            
                            {item.completed ? 
                                <div className='col s2'>&nbsp;<i className="material-icons">event_available</i>&nbsp;Completed</div> : 
                                <div className='col s2'>&nbsp;<i className="material-icons">schedule</i>&nbsp;Pending</div>}       

                            <div>
                                <Button
                                    floating
                                    fab={{direction: 'left'}}
                                    className="red"
                                    large
                                    icon={<Icon>reorder</Icon>}
                                    >
                                    <Button floating icon={<Icon>keyboard_arrow_up</Icon>} className="blue" onClick={e=>this.handleMove(e,-1)}/> 
                                    <Button floating icon={<Icon>keyboard_arrow_down</Icon>} className="green" onClick={e=>this.handleMove(e,1)}/>   
                                    <Button floating icon={<Icon>delete</Icon>} className="yellow darken-2" onClick={e=>this.handleDelete(e)}/>
                                    
                                </Button>  
                            </div>

                    </div>

                </div>
            </div>
        );
    }
}
export default ItemCard;