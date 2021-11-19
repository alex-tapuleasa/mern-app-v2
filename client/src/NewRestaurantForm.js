import React, {useState} from 'react';
import axios from 'axios';

function NewRestaurantForm () {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');

    const addRestaurant = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/restaurants/create', {title: title, location: location})
            .then(() => {
                console.log('yay! It worked')
            })
            .catch(() => {
                console.log('oops! didnt work')
            })
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