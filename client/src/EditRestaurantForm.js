import React from 'react';
import useInputState from './hooks/useInputState';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditRestaurantForm (props){
    
    const [ value, handleChange, reset] = useInputState(props)
    // const [ valueLocation ] = useInputState(props.location)

    // const { id } = useParams();

    const updateRestaurant = (id) => {
       
        axios.put(`http://localhost:5000/restaurants/${id}/edit`, {_id: id, title: value.title, location: value.location })
        

    }

    return(
        <form>
            <label htmlFor="title">Change Title</label>
            <input type="text" id="title" name='title' value={value.title} onChange={handleChange}/>
            <label htmlFor="location">Change Location</label>
            <input type="text" id="location" name='location' value={value.location} onChange={handleChange} />
            <button onClick={ () => updateRestaurant(props.id)}>Update</button>
        </form>
    )


}

export default EditRestaurantForm;