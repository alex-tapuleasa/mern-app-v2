const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    title: {type: String, min:2},
    location: {type: String, min:2},
    description: {type: String, min:10},
    image: {type: String},
    price: {type: Number, min: 0},
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
    
});

RestaurantSchema.post('findOneAndDelete', async function (doc){
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Restaurant', RestaurantSchema);