import React, { useState, useEffect } from "react";
import { data } from "../data/data.js";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecipeModal from "./OneRecipe.js"; // Import the RecipeModal component

const Food = () => {
  const [foods, setFoods] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/getRecipe"
        );
        const recipes = response.data.recipes;
        console.log(recipes);
        setFoods(recipes);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/Explore");
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-[1240px] m-auto px-4 py-12">
      <h1 className="text-orange-600 font-bold text-4xl text-center mb-5">
        Top Rated Menu Items
      </h1>

      {/* Display food */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {foods.slice(0, 8).map((item) => (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            key={item.id}
            className="border shadow-lg rounded-lg hover:scale-105 duration-500 cursor-pointer"
            onClick={() => handleRecipeClick(item)} // Open modal on click
          >
            <img
              className="w-full h-[150px] md:h-[200px] object-cover rounded-t-lg"
              src={item.image}
              alt={item.foodName}
            />
            <div className="flex justify-between px-2 py-4">
              <p>{item.foodName}</p>
              <p>
                <span className="bg-orange-500 text-white p-1 rounded-md">
                  {item.foodType}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button
          onClick={handleExploreClick}
          className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white border rounded-xl px-5 py-1"
        >
          Explore All Recipes
        </button>
      </div>

      {/* Render the RecipeModal component */}
      <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
    </div>
  );
};

export default Food;
