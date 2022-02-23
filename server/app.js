const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const { restaurantSchema, reviewSchema } = require('./schemas.js')
const Restaurant = require('./models/restaurant');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const Review = require('./models/review');




mongoose.connect('mongodb://localhost:27017/restaurants');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



const app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}))

const validateRestaurant = (req, res, next) => {
    const {error} = restaurantSchema.validate(req.body)
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body)
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}



app.post('/create', validateRestaurant, catchAsync(async (req, res) => {
    const restaurant = new Restaurant({...req.body})
    await restaurant.save();
    

}));

app.get('/restaurants', catchAsync(async (req, res)=> {
    const restaurants = await Restaurant.find({})
    res.send(restaurants)
    
}))

app.put('/restaurants/:id/edit', validateRestaurant, catchAsync(async (req, res) =>{
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndUpdate(id , {...req.body})
    
    res.send(restaurant)
}))

app.get('/restaurants/:id', catchAsync(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id).populate('reviews')
    res.send(restaurant)
    
}))

app.delete('/restaurants/:id' , catchAsync(async (req, res) =>{
    const { id } = req.params
    await Restaurant.findByIdAndDelete(id)
    res.send('Ok')
}))

//Review CRUD



app.post(`/restaurants/:id/reviews`,validateReview, catchAsync(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)
    const review = new Review({...req.body})
    restaurant.reviews.push(review);
    restaurant.populate('reviews');
    await review.save();
    await restaurant.save();
    res.send(restaurant)
}))

// app.get('/restaurants/:id/reviews/', catchAsync(async (req, res) => {
//     const restaurant = await Restaurant.findById(req.params.id).populate('reviews')
//     res.send(restaurant.reviews)
// }))

app.delete('/restaurants/:id/reviews/:reviewId' , catchAsync(async (req, res) =>{
    const { id, reviewId } = req.params;
    await Restaurant.findByIdAndUpdate(id, { $pull: { reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    console.log(req.params)
    res.send('Ok')
}))




app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong!' } = err;
    res.status(statusCode).send(message)
})


app.listen(5000, () => {
    console.log('Serving on port 5000...')
})