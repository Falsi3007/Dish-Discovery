import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeModal from './OneRecipe.js'; // Import the RecipeModal component
import EditRecipeDialog from './EditDialog.js';

const Profile = () => {
    const [foods, setFoods] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('http://localhost:5000/auth/getRecipe');
                const recipes = response.data.recipes;
                setFoods(recipes);
                console.log(response.data.recipes);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        }

        fetchData();
    }, []);

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleCloseModal = () => {
        setSelectedRecipe(null);
    };

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [recipeId, setRecipeId] = useState(null);

    const handleEditRecipe = (recipe) => {
        setEditingRecipe({ ...recipe }); // Make a copy of the recipe
        setRecipeId(recipe._id);
        setIsEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditingRecipe(null);
        setIsEditDialogOpen(false);
    };

    const handleSaveEditedRecipe = async (editedRecipe) => {
        try {
            if (recipeId && editedRecipe) {
                const response = await axios.put(`http://localhost:5000/auth/recipes/${recipeId}`, editedRecipe);

                const updatedRecipe = response.data.updatedRecipe;
                // Do something with the updated recipe data
                console.log(updatedRecipe);
                // Close the update dialog or perform any other necessary actions
                handleCloseEditDialog(); // Close the edit dialog
            }
        } catch (error) {
            console.error('Error updating recipe', error);
        }
    };


    const handleDeleteRecipe = async (recipeId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/auth/recipes/${recipeId}`);
            // Handle the success response, e.g., remove the recipe from the UI
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting recipe', error);
        }
    };


    return (
        <div className="container mt-20 mx-auto mt-10 p-4">
            <div className="bg-white mt-20 shadow-lg rounded-lg overflow-hidden">
                <div className="relative">
                    <img
                        src="https://via.placeholder.com/300"
                        alt="Profile Picture"
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 p-4">
                        <h2 className="text-2xl font-semibold text-white">John Doe</h2>
                        <p className="text-sm text-white">Web Developer</p>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-xl font-semibold">About Me</h3>
                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <h3 className="text-xl font-semibold mt-4">Contact Information</h3>
                    <p className="text-gray-600">Email: john.doe@example.com</p>
                    <p className="text-gray-600">Phone: (123) 456-7890</p>
                </div>
            </div>
            {/* Display food */}
            <AnimatePresence>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
                    {foods.map((item, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            key={item.id}
                            className='border shadow-lg rounded-lg hover:scale-105 duration-500 cursor-pointer'
                            onClick={() => handleRecipeClick(item)} // Open modal on click
                        >
                            <img
                                className='w-full h-[150px] md:h-[200px] object-cover rounded-t-lg'
                                src={item.image}
                                alt={item.foodName}
                            />
                            <div className='flex justify-between px-2 py-4'>
                                <p>{item.foodName}</p>
                                <div>
                                    <button
                                        className='bg-blue-500 text-white p-1 rounded-md mr-2'
                                        onClick={() => handleEditRecipe(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='bg-red-500 text-white p-1 rounded-md'
                                        onClick={() => handleDeleteRecipe(item._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </AnimatePresence>

            {isEditDialogOpen && (
                <EditRecipeDialog
                    recipe={editingRecipe}
                    onSave={handleSaveEditedRecipe}
                    onClose={handleCloseEditDialog}
                />
            )}

            {selectedRecipe && !isEditDialogOpen && (
                <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default Profile;
