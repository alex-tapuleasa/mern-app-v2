import React from 'react';
import useInputState from './hooks/useInputState';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    title: yup.string().required("Please enter title").min(2, "title too short"),
    location: yup.string().required("Please enter location").min(2, "Location name too short"),
    description: yup.string()
      .required("Please enter description")
      .min(10, "Description should be minimum 10 characters long"),
    image: yup.string().required('Please upload a photo'),
    price: yup.number().required('Please enter price').min(0, "Price can't be negative")  
  })


function EditRestaurantForm (props){
    
    
    // const [ value, handleChange] = useInputState(props)
    let navigate = useNavigate();
    // const [ valueLocation ] = useInputState(props.location)
        const {title, location, description, image, price, id} = props;
    
    
    const onSubmit = (values) => {
        const { id } = values;
        
        axios.put(`http://localhost:5000/restaurants/${id}/edit`, {title: values.title, location: values.location, description: values.description, image: values.image, price: values.price })
        .then(()=>{
            alert('it worked!')})
        .catch(()=>{
            alert('error!')})
            navigate('/restaurants')
            
        

    }
    const formik = useFormik({
        initialValues: { title: title, location: location, description: description, image: image, price: price, id: id},
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
                id='title'
                required
                value={formik.values.title} 
                fullWidth 
                name='title'
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                error= {formik.touched.title && Boolean(formik.errors.title)} 
                helperText={formik.touched.title && formik.errors.title}/>
            <TextField sx={{mb: 3}} 
                label="Location"
                id='location'
                name='location' 
                required
                value={formik.values.location} 
                fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur}
                error= {formik.touched.location && Boolean(formik.errors.location)} 
                helperText={formik.touched.location && formik.errors.location}/>
            <TextField sx={{mb: 3}}  
                label="Description"
                id='description' 
                required
                name='description'
                multiline
                value={formik.values.description} 
                fullWidth onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                error= {formik.touched.description && Boolean(formik.errors.description)} 
                helperText={formik.touched.description && formik.errors.description}
                />
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
            
            <Button 
                sx={{mb: 3}}
                variant="contained"
                fullWidth
                type='submit'
                 
                // onClick={() => updateRestaurant(props.id)}
                >Update
            </Button>
        </Box>
        

        // <form>
        //     <label htmlFor="title">Change Title</label>
        //     <input type="text"  value={value.title} onChange={handleChange}/>
        //     <label htmlFor="location">Change Location</label>
        //     <input type="text"  value={value.location} onChange={handleChange} />
        //     <label htmlFor="description">Change Description</label>
        //     <input type="text"   value={value.description} onChange={handleChange} />
        //     <button onClick={ () => updateRestaurant(props.id)}>Update</button>
        // </form>
    )
        

}

export default EditRestaurantForm;