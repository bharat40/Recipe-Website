import React, { useEffect, useState } from 'react';
import landing_pizza_image from '../assets/landing_pizza_image.png';
import { Link } from 'react-router-dom';

const Landing = () => {
    const [tokenn, setTokenn] = useState(null);
    const setToken = () => {
        setTokenn(localStorage.getItem("token"));
    }
    useEffect(() => {
        setToken();
    }, []);
    return (
        <section className='h-screen bg-gray-900 flex flex-col gap-[150px]'>
            <div className='flex pt-[100px] px-8'>
                <div className='w-1/2 flex flex-col gap-[30px]'>
                    <h1 className='font-bold text-3xl text-gray-50'>FOOD RECIPE</h1>
                    <p className='font-bold text-gray-300'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                    {tokenn ? <Link to="/share-recipe"><button className='bg-gray-50 text-gray-900 px-3 py-1 w-[185px] hover:scale-110 duration-300'>Share your recipe</button> </Link> : <Link to="/loginSignup"> <button className='bg-gray-50 text-gray-900 px-3 py-1 w-[185px] hover:scale-110 duration-300'>Login/Signup</button></Link>}
                </div>
                <div className='w-1/2 flex justify-end pr-[30px]'>
                    <img src={landing_pizza_image} alt="" className='w-[300px] h-[300px] animate-[spin_7s_linear_infinite]' />
                </div>
            </div>
            <div className='flex justify-between font-bold text-2xl px-8'>
                <h3 className='text-orange-400'>Swiggy</h3>
                <h3 className='text-red-500'>Zomato</h3>
                <h3 className='text-purple-600'>Zepto</h3>
                <h3 className='text-blue-500'>Filpkart</h3>
                <h3 className='text-white'>Amazon</h3>
            </div>
        </section>
    )
}

export default Landing;

