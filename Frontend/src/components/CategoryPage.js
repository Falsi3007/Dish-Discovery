// CategoryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import { data } from '../data/data.js';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeModal from './OneRecipe.js'; // Import the RecipeModal component


const CategoryPage = () => {
    const { categoryName } = useParams(); // Get the category parameter from the URL
    console.log(categoryName);

    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const [foods, setFoods] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.post('http://localhost:5000/auth/getRecipe');
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

    // Filter recipes based on the selected category
    const filteredRecipes = foods.filter((item) => item.category === categoryName);

    return (<>
        <div className='max-w-[1240px] m-auto px-4 py-12 mt-20'>
            <h1 className='text-orange-600 font-bold text-4xl text-center'>
                Types of {categoryName} 
            </h1>
            {/* Display food */}
            <AnimatePresence>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
                    {filteredRecipes.map((item, index) => (
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
                                alt={item.name}
                            />
                            <div className='flex justify-between px-2 py-4'>
                                <p>{item.foodName}</p>
                                <p>
                                    <span className='bg-orange-500 text-white p-1 rounded-md'>
                                        {item.foodType}
                                    </span>
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </AnimatePresence>

            {/* Recipe Modal */}
            <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
        </div>
        {/* </div> */}
    </>
    );
};

export default CategoryPage;
