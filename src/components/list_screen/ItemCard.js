import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{item.description}</span>

                    <div className = "info">
                        <div className='list_item_card_assigned_to'>
                            Assigned To: <span className = "assigned_to">{item.assigned_to}</span>
                        </div>
                        <div className='list_item_card_due_date'>
                            {item.due_date}
                        </div>
                        {item.completed ? <div className='list_item_card_completed'>Completed</div> : 
                            <div className='list_item_card_not_completed'>Pending</div>}
                        <button>hover</button>
                    </div>

                    

                </div>
            </div>
        );
    }
}
export default ItemCard;