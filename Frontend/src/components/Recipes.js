import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeModal from './OneRecipe.js';
import Navbar from './Navbar.js';

const AllRecipe = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  // Fetch data from the backend when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('http://localhost:5000/auth/getRecipe');
        const recipes = response.data.recipes;
        setFoods(recipes);
        setFilteredFoods(recipes); // Set both the original and filtered data
        console.log(recipes);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    fetchData();
  }, []);

  // Filter recipes by category
  const filterType = (category) => {
    if (category === 'All') {
      setFilteredFoods(foods); // Reset the filter
    } else {
      const filtered = foods.filter((item) => item.category === category);
      setFilteredFoods(filtered);
    }
  };

  // Filter recipes by type
  const filterPrice = (type) => {
    if (type === 'All') {
      setFilteredFoods(foods); // Reset the filter
    } else {
      const filtered = foods.filter((item) => item.foodType === type);
      setFilteredFoods(filtered);
    }
  };

  // Handle search input and filter recipes
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = foods.filter((item) =>
      item.foodName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFoods(filtered);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <>
      <Navbar showSearch={true} onSearch={handleSearch} />
      <div className='max-w-[1240px] m-auto px-4 py-12 mt-20'>
        <div className='flex flex-col lg:flex-row justify-between'>
          {/* Filter Category */}
          <div>
            <p className='font-bold text-gray-700'>Filter By Category</p>
            <div className='flex justify-between flex-wrap'>
              <button
                onClick={() => filterType('All')}
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

          {/* Filter Type */}
          <div>
            <p className='font-bold text-gray-700'>Filter By Type</p>
            <div className='flex justify-between flex-wrap max-w-[450px] w-full'>
              <button
                onClick={() => filterPrice('All')}
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
                onClick={() => filterPrice('Nasta')}
                className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white border rounded-xl px-3 py-1'
              >
                Nasta
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

        {/* Display food using filteredFoods instead of foods */}
        <AnimatePresence>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
            {filteredFoods.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                key={item.id}
                className='border shadow-lg rounded-lg hover:scale-105 duration-500 cursor-pointer'
                onClick={() => handleRecipeClick(item)}
              >
                <img
                  className='w-full h-[150px] md:h-[200px] object-cover rounded-t-lg'
                  src={item.image}
                  alt={item.foodName}
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
    </>
  );
};

export default AllRecipe;
