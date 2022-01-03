import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



function NewRestaurantForm () {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    let navigate = useNavigate();

    const addRestaurant = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/restaurants/create', {title: title, location: location, description: description})
            navigate('/restaurants')
    }

    return(<div>
        <form>
        <Box 
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', width:'30%', alignItems:'center', flexWrap:'wrap', mt:2, margin:'auto'
            
            }}
            noValidate
            autoComplete="off" >
            <TextField sx={{mb: 3}}
                label="Title" 
                value={title} 
                fullWidth onChange={(event) => {setTitle(event.target.value)}}/>
            <TextField sx={{mb: 3}} 
                label="Location" 
                value={location} 
                fullWidth onChange={(event) => {setLocation(event.target.value)}}/>
            <TextField sx={{mb: 3}} 
                label="Description" 
                value={description} 
                fullWidth onChange={(event) => {setDescription(event.target.value)}}/>
            <Button sx={{mb: 3}}
                    variant="contained"
                    component="label"
                    size='small'
                >Upload File
                    <input
                        type="file"
                        hidden
                    />
                </Button>
            <Button variant='contained' 
                component='label' 
                onClick={addRestaurant}>Add restaurant
            </Button>
        </Box>
        </form>
        </div>

    )
}

export default NewRestaurantForm;