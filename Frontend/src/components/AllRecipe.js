import React, { useState, useEffect } from 'react';
import { data } from '../data/data.js';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeModal from './OneRecipe.js'; // Import the RecipeModal component
import Navbar from './Navbar.js';

const AllRecipe = () => {
  const [foods, setFoods] = useState(data);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query


  useEffect(() => {
    // Filter the data based on the search query
    const filteredRecipes = data.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFoods(filteredRecipes);
    console.log(filteredRecipes);
  }, [searchQuery]);

  const filterType = (category) => {
    setFoods(
      data.filter((item) => {
        return item.category === category;
      })
    );
  };

  const filterPrice = (type) => {
    setFoods(
      data.filter((item) => {
        return item.type === type;
      })
    );
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <>
      <Navbar showSearch={true} setSearchQuery={setSearchQuery} /> 
      <div className='max-w-[1240px] m-auto px-4 py-12 mt-20'>
        <div className='flex flex-col lg:flex-row justify-between'>
          {/* Filter Type */}
          <div>
            <p className='font-bold text-gray-700'>Filter By Name</p>
            <div className='flex justify-between flex-wrap'>
              <button
                onClick={() => setFoods(data)}
                className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white border rounded-xl px-5 py-1'
              >
                All
              </button>
              <button
                onClick={() => filterType('burger')}
                className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white border rounded-xl px-5 py-1'
              >
                Burgers
              </button>
              <button
                onClick={() => filterType('pizza')}
                className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white border rounded-xl px-5 py-1'
              >
                Pizza
              </button>
              <button
                onClick={() => filterType('salad')}
                className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white border rounded-xl px-5 py-1'
              >
                Salads
              </button>
              <button
                onClick={() => filterType('sandwich')}
                className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white border rounded-xl px-5 py-1'
              >
                Sandwich
              </button>
            </div>
          </div>

          {/* Filter Price */}
          <div>
            <p className='font-bold text-gray-700'>Filter By Type</p>
            <div className='flex justify-between flex-wrap max-w-[390px] w-full'>
              <button
                onClick={() => setFoods(data)}
                className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white border rounded-xl px-3 py-1'
              >
                All
              </button>
              <button
                onClick={() => filterPrice('Breakfast')}
                className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white border rounded-xl px-2 py-1'
              >
                Breakfast
              </button>
              <button
                onClick={() => filterPrice('Brunch')}
                className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white border rounded-xl px-3 py-1'
              >
                Brunch
              </button>
              <button
                onClick={() => filterPrice('Lunch')}
                className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white border rounded-xl px-2 py-1'
              >
                Lunch
              </button>
              <button
                onClick={() => filterPrice('Dinner')}
                className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white border rounded-xl px-3 py-1'
              >
                Dinner
              </button>
            </div>
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
                  alt={item.name}
                />
                <div className='flex justify-between px-2 py-4'>
                  <p>{item.name}</p>
                  <p>
                    <span className='bg-orange-500 text-white p-1 rounded-md'>
                      {item.type}
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
    </>
  );
};

export default AllRecipe;
