import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeModal from './OneRecipe.js';
import EditRecipeDialog from './EditDialog.js';

const Profile = () => {
    const [foods, setFoods] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipeToDelete, setRecipeToDelete] = useState(null);


    const [isEditingOrDeleting, setIsEditingOrDeleting] = useState(false);



    useEffect(() => {
        // Fetch recipes on component mount
        async function fetchData() {
            try {
                const userEmail = await localStorage.getItem('userEmail');
                console.log(userEmail);
                const response = await axios.post('http://localhost:5000/auth/getUserRecipe', {userEmail: userEmail});
                const recipes = response.data.recipes;
                setFoods(recipes);
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
        setIsEditingOrDeleting(true); // Set the flag when editing
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
                console.log(updatedRecipe);

                // Update the recipe list state after editing
                const updatedRecipes = foods.map((recipe) =>
                    recipe._id === updatedRecipe._id ? updatedRecipe : recipe
                );
                setFoods(updatedRecipes);

                // Close the edit dialog
                handleCloseEditDialog();
            }
        } catch (error) {
            console.error('Error updating recipe', error);
        }
    };


    const handleDeleteRecipe = async (recipe) => {
        // Set the recipe to delete in state
        setRecipeToDelete(recipe);
        setIsEditingOrDeleting(true); // Set the flag when editing
    };

    const confirmDelete = async () => {
        if (recipeToDelete) {
            try {
                const response = await axios.delete(`http://localhost:5000/auth/recipes/${recipeToDelete._id}`);
                // Handle the success response
                console.log(response.data);

                // Update the recipe list state after deletion
                const updatedRecipes = foods.filter((recipe) => recipe._id !== recipeToDelete._id);
                setFoods(updatedRecipes);
                setRecipeToDelete(null); // Clear the recipe to delete
            } catch (error) {
                console.error('Error deleting recipe', error);
            }
        }
    };
    
    const userEmail = localStorage.getItem('userEmail');

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
                    <p className="text-gray-600">Email: {userEmail}</p>
                    {/* <p className="text-gray-600">Phone: (123) 456-7890</p> */}
                </div>
            </div>
            <AnimatePresence>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                    {foods.map((item) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            key={item._id}
                            className="border shadow-lg rounded-lg hover:scale-105 duration-500 cursor-pointer"
                            onClick={() => handleRecipeClick(item)}
                        >
                            <img
                                className="w-full h-[150px] md:h-[200px] object-cover rounded-t-lg"
                                src={item.image}
                                alt={item.foodName}
                            />
                            <div className="flex justify-between px-2 py-4">
                                <p>{item.foodName}</p>
                                <div>
                                    <button
                                        className="bg-blue-500 text-white p-1 rounded-md mr-2"
                                        onClick={() => handleEditRecipe(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white p-1 rounded-md"
                                        onClick={() => handleDeleteRecipe(item)}
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

            {selectedRecipe && !isEditDialogOpen && !isEditingOrDeleting && (
                <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
            )}

            
            {/* Confirmation modal for delete */}
            {recipeToDelete && !isEditDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white max-w-screen-md mx-4 p-4 rounded-lg shadow-lg overflow-hidden">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Confirm Deletion</h2>
                        <p className="text-gray-700">
                            Are you sure you want to delete {recipeToDelete.foodName}?
                        </p>
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-red-500 text-white p-2 rounded-md"
                                onClick={confirmDelete}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setRecipeToDelete(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
