import React from 'react';
import Button from 'react-materialize/lib/Button';
import Icon from 'react-materialize/lib/Icon';



class ItemCard extends React.Component {
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
                                    <Button floating icon={<Icon>keyboard_arrow_up</Icon>} className="blue" /> 
                                    <Button floating icon={<Icon>keyboard_arrow_down</Icon>} className="green" />   
                                    <Button floating icon={<Icon>delete</Icon>} className="yellow darken-2" />
                                    
                                    
                                </Button>  
                            </div>

                    </div>

                </div>
            </div>
        );
    }
}
export default ItemCard;