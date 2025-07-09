import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ title, time, coverImg, likes, path = false, id }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/recipe/${id}`);
    }
    return (
        <div className='w-[250px] h-[250px] bg-gray-100 border border-gray-100 shadow shadow-gray-50 hover:scale-105 duration-300' onClick={handleClick}>
            <div>
                <img src={`http://localhost:5000/images/${coverImg}`} alt="recipe-image" className='w-full h-[170px]' />
            </div>
            <div className='flex flex-col gap-[30px] items-center'>
                <span className='font-bold'>{title}</span>
                <div className='flex justify-evenly w-full'>
                    <span className='font-bold'>⏲️{time}</span>
                    <span className='font-bold'>❣️{likes.length}</span>
                    {
                        path && (
                            <div>
                                <span onClick={() => navigate("/edit-recipe")}>✏️</span>
                                <span>🗑️</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default RecipeCard;
