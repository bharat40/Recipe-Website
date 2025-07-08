import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const getAllRecipes = async () => {
        const response = await axios.get('http://localhost:5000/recipe');
        setRecipes(response.data.data);
    }
    useEffect(() => {
        getAllRecipes();
    }, []);
    return (
        <section className='h-screen bg-gray-900 pt-2 px-8 flex flex-col gap-[50px]'>
            <div className='flex flex-col items-center gap-3'>
                <h1 className='text-gray-100 text-3xl font-extrabold'>Recipes 😋</h1>
                {
                    recipes.length === 0 ? <h1 className='text-white text-2xl'>Loading...</h1> : <h3 className='text-gray-200 text-2xl'>Total number of recipes: {recipes.length}</h3>
                }
            </div>
            <div className='flex flex-wrap gap-[30px]'>
                {
                    recipes.length > 0 && recipes.map((recipe) => {
                        return (
                            <RecipeCard key={recipe._id} title={recipe.title} time={recipe.time} likes={recipe.likes} coverImg={recipe.coverImg} />
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Recipes
