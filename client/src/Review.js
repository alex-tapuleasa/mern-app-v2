import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';




function Review (props) {
    let { id } = useParams();
    const { restaurantId} = props;
    let navigate = useNavigate();
    
    const removeReview = async () => {
       await axios.delete(`http://localhost:5000/restaurants/${id}/reviews/${props.review._id}`);
       props.toggleUpdate();
        // navigate(`/restaurants/${restaurantId}`)

    }
    
   
    const {review} = props;
    return(
        <div>
            
            <Card sx={{ maxWidth: 645, mb: 2, mt: 10, margin:'30px auto' }}>
      
      <CardContent>
      <Typography gutterBottom variant="h5" component="div">
          Rating: {review.rating}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          Review: {review.body}
        </Typography>
        <Typography color='lightBlue' variant="body2">
          {`Added on: ${new Date().toLocaleString()}`}
        </Typography>
        
      </CardContent>
      <CardActions>
      <Button size='small' variant='text' onClick={removeReview}>Delete</Button>
      </CardActions>
    </Card>
           
        </div>        
    )
            
        
}

export default Review;