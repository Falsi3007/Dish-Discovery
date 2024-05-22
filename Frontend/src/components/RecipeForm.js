import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/Login");
    }
  }, []);

  const [foodName, setFoodName] = useState('');
  const [category, setCategory] = useState('');
  const [foodType, setFoodType] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(''); // Added ingredients state
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem("userEmail");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('foodName', foodName);
      formDataToSend.append('category', category);
      formDataToSend.append('foodType', foodType);
      formDataToSend.append('description', description);
      formDataToSend.append('ingredients', ingredients); // Include ingredients in the form data
      formDataToSend.append('image', image);
      formDataToSend.append('userEmail', userEmail);

      const response = await axios.post('http://localhost:5000/auth/addRecipe', formDataToSend);

      if (response.status === 200) {
        console.log('Recipe added successfully');
        navigate('/'); // Redirect to the homepage after successful submission
      } else {
        console.error ('Error adding recipe');
      }
    } catch (error) {
      console.error('Error adding recipe', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: `url('/assets/bg.jpg')` }}>
      <form onSubmit={handleSubmit} className="max-w-md p-4 bg-gray-300 mt-20 bg-opacity-80 shadow-lg rounded-md mx-4 w-full">
        <div className="mb-4">
          <label htmlFor="foodName" className="block text-gray-700 font-semibold">Food Name</label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-semibold">Category</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="">Select Category</option>
            <option value="burger">Burger</option>
            <option value="pizza">Pizza</option>
            <option value="salad">Salad</option>
            <option value="sandwich">Sandwich</option>
            <option value="dhosa">Dhosa</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="foodType" className="block text-gray-700 font-semibold">Type</label>
          <select
            id="foodType"
            name="foodType"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="">Select Type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Brunch">Brunch</option>
            <option value="Nasta">Nasta</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-gray-700 font-semibold">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)} // Handle ingredients input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-semibold">Image Input</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover-bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
