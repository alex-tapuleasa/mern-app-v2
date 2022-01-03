import React from 'react';
import useInputState from './hooks/useInputState';
import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';


function EditRestaurantForm (props){
    
    
    const [ value, handleChange] = useInputState(props)
    let navigate = useNavigate();
    // const [ valueLocation ] = useInputState(props.location)

    // const { id } = useParams();

    const updateRestaurant = (id) => {
       
        axios.put(`http://localhost:5000/restaurants/${id}/edit`, {_id: id, title: value.title, location: value.location, description: value.description })
            navigate('/restaurants')
        

    }

    return( <div>
        <form sx={{ alignItems: 'center'}}>
        <Box 
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', width:'30%', alignItems:'center', justifyContent:'center', flexWrap:'wrap', mt:2, margin:'auto'
            
            }}
            noValidate
            autoComplete="off" >
            <TextField sx={{mb: 3}}
                label="Title" id="title" 
                value={value.title} name='title'
                fullWidth onChange={handleChange}/>
            <TextField sx={{mb: 3}} 
                label="Location"  id="location"
                value={value.location} name='location'
                fullWidth onChange={handleChange}/>
            <TextField sx={{mb: 3}} 
                label="Description" id="description"
                value={value.description} name='description'
                fullWidth onChange={handleChange}/>
            
            <Button variant='contained' 
                component='label' 
                onClick={() => updateRestaurant(props.id)}>Update
            </Button>
        </Box>
        </form>
        </div>

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