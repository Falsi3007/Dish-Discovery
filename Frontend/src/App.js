import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import Card from './components/Card';
import Category from './components/Category';
import Food from './components/Food';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import AllRecipe from './components/AllRecipe';
import RecipeForm from './components/RecipeForm';
import NewLogin from './components/NewLogin';
import CategoryPage from './components/CategoryPage';
import Recipes from './components/Recipes';
import Profile from './components/Profile';
import ParentComponent from './components/Parent';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/Login" element={<><Navbar /><Login /></>} /> */}
          <Route path="/SignUp" element={<><Navbar /><Signup /></>} />
          <Route path="/profile" element={<><Navbar /><Profile /></>} />
          <Route path="/Explore" element={<><ParentComponent/></>} />
          {/* <Route path="/Explore" element={<><Navbar /><Recipes /></>} /> */}
          {/* <Route path="/Explore" element={<><Navbar /><AllRecipe /></>} /> */}
          <Route path="/login" element={<><Navbar /><NewLogin /></>} />
          <Route path="/categories/:categoryName" element={<><Navbar /><CategoryPage /></>} />
          <Route
            path="/Form"
            element={
              <><Navbar /><RecipeForm /></>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <Food />
                <Category />
                <Card />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
