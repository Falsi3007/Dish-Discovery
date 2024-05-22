import React, { useState } from 'react';

const EditRecipeDialog = ({ recipe, onSave, onClose }) => {
  const [editedRecipe, setEditedRecipe] = useState({ ...recipe });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({ ...editedRecipe, [name]: value });
  };

  const handleSave = () => {
    onSave(editedRecipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-1/2 max-w-screen-md p-4 rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Edit Recipe</h2>
        <div className="mb-4">
          <label htmlFor="foodName" className="block text-sm font-medium text-gray-700">
            Food Name
          </label>
          <input
            type="text"
            name="foodName"
            value={editedRecipe.foodName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={editedRecipe.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Category</option>
            <option value="burger">Burger</option>
            <option value="pizza">Pizza</option>
            <option value="salad">Salad</option>
            <option value="sandwich">Sandwich</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="foodType" className="block text-sm font-medium text-gray-700">
            Food Type
          </label>
          <select
            id="foodType"
            name="foodType"
            value={editedRecipe.foodType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={editedRecipe.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
            Ingredients
          </label>
          <textarea
            name="ingredients"
            value={editedRecipe.ingredients}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white p-2 rounded-md" onClick={handleSave}>
            Save
          </button>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeDialog;
