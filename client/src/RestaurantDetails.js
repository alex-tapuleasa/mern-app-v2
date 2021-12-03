import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useToggle from './hooks/useToggleState';
import EditRestaurantForm from './EditRestaurantForm';





function RestaurantDetails (){
    let { id } = useParams();
    let navigate = useNavigate();
    const [details, setDetails] = useState([]) 
    const [isEditing, toggle] = useToggle(false)

    const removeRestaurant = async (id) => {
        await axios.delete(`http://localhost:5000/restaurants/${id}`)
        navigate('/restaurants')

    }
 
    useEffect(() => { async function getData(){
    const response = await axios.get(`http://localhost:5000/restaurants/${id}`)
    setDetails(response.data);
    
   }getData();
   
   
   }, [id])
   
   return (
       <div>
           {
           isEditing ? <EditRestaurantForm title={details.title} location={details.location} id={details._id}/> :
            <>
                <li>{details.title}</li>
                <li>{details.location}</li>
                <a href='/restaurants'>Go back</a>
                <button onClick={toggle} >Edit</button>
                <button onClick={() => removeRestaurant(id)}>Delete</button>
            </>
            }
       </div>
   )
}

export default RestaurantDetails;