import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleRecipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState([]);
    const getRecipe = async () => {
        const response = await axios.get(`http://localhost:5000/recipe/${id}`);
        console.log(response.data.data);
        setRecipe(response.data.data);
    }
    useEffect(() => {
        getRecipe();
    }, []);
    return (
        <section className='h-screen'>
            {
                recipe.length != 0 ? (<div className='flex justify-center w-full '>
                    <div className='w-[50%]'><img src={`http://localhost:5000/images/${recipe.coverImg}`} alt="foodImage" className='w-[50%]' /></div>
                    <div>
                        <h1>{recipe.title}</h1>
                        <p>{recipe.ingredients}</p>
                        <p>{recipe.instructions}</p>
                        <span>{recipe.time}</span>
                    </div>
                </div>) : (<h2 className='text-center font-bold text-2xl'>Loading...</h2>)
            }

        </section>
    )
}

export default SingleRecipe;