import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import photo1 from './photo-1.jpeg'



function Restaurant (props) {
   
    const {title, location, description, image, price, id} = props;
    return(
        <div>
            
            <Card sx={{ maxWidth: 645, mb: 2, mt: 10, ml: 15 }}>
      <CardMedia
        component="img"
        height="140"
        image={photo1}
        alt="restaurant"
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {image}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={`/restaurants/${id}`} size="small">Details</Button>
      </CardActions>
    </Card>
           
        </div>        
    )
            
        
}

export default Restaurant;