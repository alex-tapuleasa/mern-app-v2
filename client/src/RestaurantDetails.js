import React, { useState, useEffect, useMemo, useRef} from 'react';
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
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider'
import { useFormik } from 'formik';
import * as yup from 'yup';
import photo2 from './photo-2.jpeg'
import ReviewList from './ReviewList';



const validationSchema= yup.object({
    body: yup.string().required("Please enter text"),
    rating: yup.number().required("Please rate")
})


function RestaurantDetails (props){
    let { id } = useParams();
    let navigate = useNavigate();
    const [isUpdated, setIsUpdated] = useState(false)
    const [details, setDetails] = useState([]) 
    const [isEditing, toggle] = useToggle(false)
    const hasFetchedData = useRef(false);

    const removeRestaurant = async (id) => {
        await axios.delete(`http://localhost:5000/restaurants/${id}`)
        navigate('/restaurants')

    }

   

    const toggleUpdate = () => {
        setIsUpdated(prev => !prev)
    }

    const onSubmit = async (values, {resetForm}) => {
        const {body, rating }= values;
     await axios.post(`http://localhost:5000/restaurants/${id}/reviews`,{ body: body, rating: rating} )
        toggleUpdate();
        resetForm({values:''})
        // navigate(`/restaurants/${id}`)
    }

    const formik = useFormik({
        initialValues: { body: "", rating: "5"},
        validateOnBlur: true,
        validationSchema: validationSchema,
        onSubmit
    })

    // useEffect(() => {async function getReview(){
    //     const response =await axios.get(`http://localhost:5000/restaurants/${id}/reviews`)
    //     setReviews(response.data);

    
        
    //     }getReview();}, [id])
 
    useEffect(() => { 
        async function getData(){
    const response = await axios.get(`http://localhost:5000/restaurants/${id}`)
    
    setDetails(prev => response.data);
        
        }getData();
   
   
   }, [id, isUpdated])

   
   
   return (<div>
           {/* <img src={photo1} alt="photo-1" /> */}
           {
           isEditing ? <EditRestaurantForm title={details.title} location={details.location} id={details._id} description={details.description} image={details.image} price={details.price}/> :
            <>
                {/* <li>{details.title}</li>
                <li>{details.location}</li>
                <li>{details.description}</li>
                
                <a href='/restaurants'>Go back</a>
                <button onClick={toggle} >Edit</button>
                <button onClick={() => removeRestaurant(id)}>Delete</button> */}
                
                <Card sx={{ maxWidth: 700, mb:2, margin:'90px auto 30px'}}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={photo2}
                        alt="restaurant"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{textDecoration:'underline'}}>
                        Restaurant: {details.title}
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div">
                        Location: {details.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Description: {details.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant='text' href='/restaurants'>Go back</Button>
                        <Button variant='text' onClick={toggle} >Edit</Button>
                        <Button variant='text' onClick={() => removeRestaurant(id)}>Delete</Button>
                    </CardActions>
                    
                </Card>
                
                
                

                <Box component="form"
                onSubmit={formik.handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', width:'30%', alignItems:'center', flexWrap:'wrap', margin:'30px auto' 
                }}
                noValidate
                autoComplete="off" >
                    <Typography>Leave a review</Typography>
                    <input type='range' sx={{mt:'10px', ml:'20px', maxWidth:'150', mb: '10px'}}
                        aria-label='Review Rating'
                        name='rating'
                        default-value={1}
                        valueLabelDisplay='auto'
                        step={1}
                        marks
                        min={1} max={5}
                        value={formik.values.rating}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        error= {formik.touched.rating && Boolean(formik.errors.rating)} 
                        helperText={formik.touched.rating && formik.errors.rating}
                    />
                    <TextField sx={{mb: 3, mt: 2}}
                        label="Review" 
                        required
                        value={formik.values.body} 
                        fullWidth 
                        name='body'
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        error= {formik.touched.body && Boolean(formik.errors.body)} 
                        helperText={formik.touched.body && formik.errors.body} 
                    />
                   <Button type='submit' size='small' variant='contained' >Add Review</Button>
                   
                </Box>
                <ReviewList restaurantId={details._id} reviews={details.reviews} toggleUpdate={toggleUpdate}/>
            </>
            }
       </div>
   )
}

export default RestaurantDetails;