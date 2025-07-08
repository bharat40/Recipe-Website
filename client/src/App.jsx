import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from "./pages/Landing.jsx";
import Recipes from "./pages/Recipes.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoginSignup from "./pages/LoginSignup.jsx";
import ShareRecipe from "./pages/ShareRecipe.jsx";
import MyRecipes from "./pages/MyRecipes.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/loginSignup" element={<LoginSignup />} />
        <Route path="/share-recipe" element={<ShareRecipe />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
