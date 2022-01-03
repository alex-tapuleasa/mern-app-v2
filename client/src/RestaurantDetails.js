import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useToggle from './hooks/useToggleState';
import EditRestaurantForm from './EditRestaurantForm';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import photo1 from './photo-1.jpeg'






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
   
   return (<div>
           {/* <img src={photo1} alt="photo-1" /> */}
           {
           isEditing ? <EditRestaurantForm title={details.title} location={details.location} id={details._id} description={details.description}/> :
            <>
                {/* <li>{details.title}</li>
                <li>{details.location}</li>
                <li>{details.description}</li>
                
                <a href='/restaurants'>Go back</a>
                <button onClick={toggle} >Edit</button>
                <button onClick={() => removeRestaurant(id)}>Delete</button> */}

                <Card sx={{ maxWidth: 700, mb:2 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={photo1}
                        alt="restaurant"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {details.title}
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div">
                        {details.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {details.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant='text' href='/restaurants'>Go back</Button>
                        <Button variant='text' onClick={toggle} >Edit</Button>
                        <Button variant='text' onClick={() => removeRestaurant(id)}>Delete</Button>
                    </CardActions>
                </Card>
           
            </>
            }
       </div>
   )
}

export default RestaurantDetails;