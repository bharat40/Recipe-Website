import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditRecipe = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [file, setFile] = useState('');
    const [time, setTime] = useState('');
    const { id } = useParams();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('title', title);
            formData.append('ingredients', ingredients);
            formData.append('instructions', instructions);
            formData.append('time', time);
            formData.append('coverImg', file);
            const response = await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
                headers: {
                    'authorization': 'bearer ' + localStorage.getItem('token')
                }
            });
            alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }
    const fetchData = async () => {
        const response = await axios.get(`http://localhost:5000/recipe/${id}`);
        setTitle(response.data.data.title);
        setIngredients(response.data.data.ingredients);
        setInstructions(response.data.data.instructions);
        setTime(response.data.data.time);
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <section className='bg-gray-900 h-screen flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='text-gray-200 flex flex-col bg-gray-700 p-6 gap-2 w-[700px]'>
                <input type="text" name="" id="" placeholder='Title' className='border-b' value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea name="" id="" placeholder='Ingredients (comma separated)' className='border-b' value={ingredients} onChange={(e) => setIngredients(e.target.value)}></textarea>
                <textarea name="" id="" placeholder='Instructions' className='border-b' value={instructions} onChange={(e) => setInstructions(e.target.value)}></textarea>
                <input type="file" name="file" id="" placeholder='Recipe image' className='border-b' onChange={(e) => setFile(e.target.files[0])} />
                <input type="text" name="" id="" placeholder='Time' className='border-b' value={time} onChange={(e) => setTime(e.target.value)} />
                <button type="submit" className='p-2 bg-gray-500 active:bg-gray-600 duration-300'>Post</button>
            </form>
        </section>
    )
}

export default EditRecipe;
