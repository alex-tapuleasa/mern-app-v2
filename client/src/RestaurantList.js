import React, { useState , useEffect } from 'react';
import axios from 'axios';
import Restaurant from './Restaurant';


function RestaurantList (props) {
 const [restaurants, setRestaurants] = useState([]) 
 
 useEffect(() => { async function getData(){
   const response = await axios.get('http://localhost:5000/restaurantslist')
   setRestaurants(response.data);
  }getData();
  
  }, [restaurants])
    return(
        <div>
           {restaurants.map(restaurant => (
             <li><a href={`/restaurants/${restaurants._id}`}>
               <Restaurant 
                  key={restaurant._id} 
                  title={restaurant.title} 
                  location={restaurant.location} 
                  id={restaurant._id}/>
               </a></li>
           ))}
        </div>
        
    )
}

export default RestaurantList;