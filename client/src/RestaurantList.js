import React, { useState , useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Restaurant from './Restaurant';
import Button from '@mui/material/Button';





function RestaurantList (props) {
 

 
  
 const [restaurants, setRestaurants] = useState([]) 

 
 
 useEffect(() => { async function getData(){
   const response = await axios.get('http://localhost:5000/restaurants')
   setRestaurants(response.data);
   
  }getData();
  
  }, [])
    return(
        <div>
           
            {restaurants.map(restaurant => (
                  <Restaurant 
                      description = {restaurant.description}
                      id = {restaurant._id}
                      title={restaurant.title}
                      location={restaurant.location}
                      image={restaurant.image}
                      price={restaurant.price}
                      key={restaurant._id}  />
            ) )}  
          {/* <Button variant='contained' href='/new'>Add Restaurant</Button> */}
        </div>
        
    )
}

export default RestaurantList;