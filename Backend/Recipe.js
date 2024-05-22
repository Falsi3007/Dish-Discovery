const mongoose = require('mongoose');

const MySchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    foodType: {
        type: String,
        required: true,
        // enum: ['Appetizer', 'Main Course', 'Dessert'], // Allow only specific values
    },
    description: {
        type: String,
    },
    ingredients: {
        type: String, // Store the image as a String
    },
    image: {
        type: String, // Store the image as a String
    },
    userEmail: {
        type: String, 
    },
});

const Recipe = mongoose.model('data', MySchema);

module.exports = Recipe;
