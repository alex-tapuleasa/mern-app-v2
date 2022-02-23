import React, { useState , useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Review from './Review';
import Button from '@mui/material/Button';





function ReviewList (props) {
 

  let {restaurantId} = props;
  let {id} = useParams();
//  const [reviews, setReviews] = useState([]) 





 
 
//  useEffect(() => { async function getData(){
   
//    const response = await axios.get(`http://localhost:5000/restaurants/${id}/reviews/`, reviews)
//    setReviews(response.data);
   
   
//   }getData();
  
//   }, [id]);

  const reviews = props.reviews?.slice(0).reverse().map((review,idx) => {
      return(
                  <Review 
                  key = {idx}
                      review = {review}
                      restaurantId={props.restaurantId}
                      toggleUpdate={props.toggleUpdate}
                       />
  )})

    return(
        <div>
           
            {  reviews}  
          {/* <Button variant='contained' onClick=>Add Review</Button> */}
        </div>
        
    )
}

export default ReviewList;