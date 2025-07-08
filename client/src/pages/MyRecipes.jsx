import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import axios from "axios";

const MyRecipes = () => {
  const [MyRecipes, setMyRecipes] = useState([]);
  const getMyRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/recipe/my`, {
        headers: {
          'authorization': 'bearer ' + localStorage.getItem("token")
        }
      });
      setMyRecipes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMyRecipes();
  }, []);
  return (
    <section>
      <div className='flex flex-wrap gap-[30px]'>
        {
          MyRecipes.length > 0 ? (MyRecipes.map((recipe) => {
            return (
              <RecipeCard key={recipe._id} title={recipe.title} time={recipe.time} likes={recipe.likes} coverImg={recipe.coverImg} />
            )
          })) : (<h1 className='text-center'>No Recipes</h1>)
        }
      </div>
    </section>
  )
}

export default MyRecipes
