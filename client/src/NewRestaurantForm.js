import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewRestaurantForm () {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    let navigate = useNavigate();

    const addRestaurant = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/restaurants/create', {title: title, location: location})
            navigate('/restaurants')
    }

    return(
        <div>
            <form>
                <label htmlFor="title"></label>
                <input type='text' placeholder='Title' id='title' onChange={(event) => {setTitle(event.target.value)}}/>
                <label htmlFor="location"></label>
                <input type='text' placeholder='Location' id='location' onChange={(event) => {setLocation(event.target.value)}}/>
                <button onClick={addRestaurant}>Add restaurant</button>
            </form>
        </div>
    )
}

export default NewRestaurantForm;