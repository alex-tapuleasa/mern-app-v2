const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const Restaurant = require('./models/restaurant');



mongoose.connect('mongodb://localhost:27017/restaurants');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



const app = express();

app.use(cors());
app.use(express.json());




app.post('/restaurants/create', async (req, res) => {
    const {title, location} = req.body;
    const restaurant = new Restaurant({title: title, location: location})
    await restaurant.save();
    

});

app.get('/restaurantslist', async (req, res)=> {
    const restaurants = await Restaurant.find({})
    res.send(restaurants)
    
})

app.get('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)
    res.send(restaurant)
})




app.listen(5000, () => {
    console.log('Serving on port 5000...')
})