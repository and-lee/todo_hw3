import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-1 todo-list-link light-green lighten-3">
                <div className="card-content black-text text-darken-3">

                    <span className="card-title">{item.description}</span>
                    
                    <span className = "info">
                        <div className='list_item_card_assigned_to'>
                            Assigned To: <span className = "assigned_to">{item.assigned_to}</span>
                        </div>
                        <div className='list_item_card_due_date'>
                            {item.due_date}
                        </div>
                        {item.completed ? 
                            <div className='list_item_card_completed'><i class="material-icons">event_available</i>&nbsp;Completed</div> : 
                            <div className='list_item_card_not_completed'><i class="material-icons">schedule</i>&nbsp;Pending</div>}

<a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>                    

                    </span>


                </div>
            </div>
        );
    }
}
export default ItemCard;