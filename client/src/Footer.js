import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


export default function Footer(props) {
  return (
    <Typography sx={{position:'fixed',
        bottom:0,
        width:'100%',
        height:'50px' }} 
        variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        YelpRestaurant
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}