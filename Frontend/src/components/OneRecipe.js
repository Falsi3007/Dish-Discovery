import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RecipeModal = ({ recipe, onClose }) => {

    return (
        <AnimatePresence>
            {recipe && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                >
                    <motion.div
                        initial={{ scale: 0.7 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.7 }}
                        className="bg-white max-w-screen-md mx-4 p-4 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
                    >
                        <div className="w-full md:w-1/2">
                            <img
                                // src={`data:image/jpeg;base64,${bufferToBase64(recipe.image.data)}`}
                                src={recipe.image}
                                alt={recipe.name}
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-4">
                            <div className="flex justify-between mb-2">
                                <h2 className="text-2xl font-bold">{recipe.name}</h2>
                                <button
                                    onClick={() => onClose()}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    Close
                                </button>
                            </div>
                            <p>Food: {recipe.foodName}</p>
                            <p>Type: {recipe.foodType}</p>
                            <p>Category: {recipe.category}</p>
                            <p>Ingridients: {recipe.ingredients}</p>
                            <p>Description: {recipe.description}</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RecipeModal;
