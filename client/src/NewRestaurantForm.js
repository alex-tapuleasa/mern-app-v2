import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
import * as yup from "yup";

       const validationSchema= yup.object({
          title: yup.string().required("Please enter title").min(2, "Title too short"),
          location: yup.string().required("Please enter location").min(2, "Location name too short"),
          description: yup.string()
            .required("Please enter description")
            .min(10, "Description should be minimum 10 characters long"),
            image: yup.string().required('Please upload a photo'),
            price: yup.number().required('Please enter price').min(0, "Price can't be negative")
        })

function NewRestaurantForm () {
    // const [title, setTitle] = useState('');
    // const [location, setLocation] = useState('');
    // const [description, setDescription] = useState('');
    let navigate = useNavigate();

    const onSubmit = (values) => {
        const {title, location, description, image, price }= values;
        axios.post('http://localhost:5000/create', {title: title, location: location, description: description, image: image, price: price})
            navigate('/restaurants')
            
    }
    const formik = useFormik({
        initialValues: { title: "", location: "", description: "", image: "", price: ""},
        validateOnBlur: true,
        validationSchema: validationSchema,
        onSubmit
    })
    
    return(
        <Box component="form"
        onSubmit={formik.handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', width:'30%', alignItems:'center', flexWrap:'wrap', mt:2, margin:'auto'
        
        }}
        noValidate
        autoComplete="off" >
        <TextField sx={{mb: 3, mt: 15}}
            label="Title" 
            required
            value={formik.values.title} 
            fullWidth 
            name='title'
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            error= {formik.touched.title && Boolean(formik.errors.title)} 
            helperText={formik.touched.title && formik.errors.title} />
        <TextField sx={{mb: 3}} 
            label="Location"
            name='location' 
            required
            value={formik.values.location} 
            fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur}
            error= {formik.touched.location && Boolean(formik.errors.location)} 
            helperText={formik.touched.location && formik.errors.location}/>
        <TextField sx={{mb: 3}} 
            label="Description" 
            required
            name='description'
            multiline
            value={formik.values.description} 
            fullWidth onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            error= {formik.touched.description && Boolean(formik.errors.description)} 
            helperText={formik.touched.description && formik.errors.description}/>
        <TextField sx={{mb: 3}} 
            label="Image" 
            required
            name='image'
            multiline
            value={formik.values.image} 
            fullWidth onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            error= {formik.touched.image && Boolean(formik.errors.image)} 
            helperText={formik.touched.image && formik.errors.image}/>
        <TextField sx={{mb: 3}} 
            label="Price" 
            required
            name='price'
            multiline
            value={formik.values.price} 
            fullWidth onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            error= {formik.touched.price && Boolean(formik.errors.price)} 
            helperText={formik.touched.price && formik.errors.price}/>
        
        <Button sx={{mb: 3}}
                variant="contained"
                fullWidth
                type='submit'>
                    Add Restaurant
                </Button>
        </Box>
       
    )}
        
            
           

export default NewRestaurantForm;

