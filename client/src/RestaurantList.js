import React, { useState , useEffect } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import Restaurant from './Restaurant';




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
                <li>
                  <Link to={`${restaurant._id}`}>
                    <Restaurant 
                      id = {restaurant._id}
                      title={restaurant.title}
                      location={restaurant.location}
                      key={restaurant._id}  />
                  </Link>
                </li>
               
            ) )}  
          <button><a href='/new'>Add Restaurant</a></button>
        </div>
        
    )
}

export default RestaurantList;