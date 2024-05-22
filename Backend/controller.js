// const Task = require('./model');
const User = require('./User');
const Recipe = require('./Recipe');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(req.body);

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
}

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'abcdefghijklmnopqrst', { expiresIn: '1h' });
        console.log(token);

        res.status(200).json({
            token,
            userId: user._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}



const fs = require('fs');
const path = require('path');


//for adding recipes
exports.addRecipe = async (req, res) => {
    try {
        // Parse form data
        const { foodName, category, foodType, description, ingredients, userEmail  } = req.body;
        const name = req.file.filename;
        const image = `/imgs/${name}`

        console.log(foodName, category, foodType, description, image, ingredients, userEmail);

        // Create a new Recipe document
        const newRecipe = new Recipe({
            foodName,
            category,
            foodType,
            description,
            image,
            ingredients, 
            userEmail
        });

        // Save the recipe to the database
        await newRecipe.save();

        console.log(newRecipe.toJSON())

        res.status(200).json({ message: 'Recipe added successfully' });
    } catch (error) {
        console.error('Error adding recipe', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



// Get all recipes with images
exports.getRecipe = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json({ recipes });
    } catch (error) {
        console.error('Error fetching recipes', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.getRecipesForUser = async (req, res) => {
    try {

        const {userEmail} = req.body; // Retrieve the user's email from the request query parameter
        console.log(userEmail,"email");

        // Find recipes that belong to the user with the specific email
        const userRecipes = await Recipe.find({ userEmail });

        res.json({ recipes: userRecipes });
    } catch (error) {
        console.error('Error fetching user recipes', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};






exports.editRecipe =  async (req, res) => {
    const recipeId = req.params.recipeId;
    const { foodName, category, foodType, description, image } = req.body;
    
    console.log("update : " , req.body);

    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            recipeId,
            {
                foodName,
                category,
                foodType,
                description,
                image,
            },
            { new: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        console.log(updatedRecipe);

        res.status(200).json({ message: 'Recipe updated successfully', updatedRecipe });
    } catch (error) {
        console.error('Error updating recipe', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.deleteRecipe = async (req, res) => {
    const recipeId = req.params.recipeId;
    try {
        const deletedRecipe = await Recipe.findByIdAndRemove(recipeId);
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        console.error('Error deleting recipe', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




exports.createTask = async (req, res) => {

    try {
        const taskData = await req.body;
        const createdTask = await Task.create(taskData);
        if (!createdTask) {
            return res.status(404).json({
                success: false,
                message: "Task creation failed",
                error: "Unable to get created task"
            });
        }

        res.status(201).json({
            success: true,
            createdTask
        });
    } catch (error) {
        res.status(500)
            .json({
                success: false,
                message: "Internal server error"
            })
    }
}


exports.getTasks = async (req, res) => {
    try {
        Task.find()
            .then((allTasks) => {
                res.status(200)
                    .json({
                        success: true,
                        allTasks
                    })
            })
            .catch((error) => {
                res.status(404)
                    .json({
                        success: false,
                        message: "Cant fined ",
                        error
                    })
            })
    } catch (error) {
        res.status(500)
            .json({
                success: false,
                message: "Internal server error",
                error: error.message
            })
    }
}