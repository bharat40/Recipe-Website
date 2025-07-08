import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [userName, setUserName] = useState("");
    const [userProfile, setUserProfile] = useState("");
    const fetchUsersCount = async () => {
        const response = await axios.get('http://localhost:5000/user/users-count');
        setUsersCount(response.data.data);
    }
    const [tokenn, setTokenn] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const setToken = () => {
        setTokenn(localStorage.getItem("token"));
        setUserName(localStorage.getItem("username"));
        setUserProfile(localStorage.getItem("userProfile"));
    }
    const handleLogout = () => {
        localStorage.clear();
        setTokenn(null);
        setUserName("");
        setUserProfile("");
        navigate("/loginSignup");
    }
    useEffect(() => {
        setToken();
    }, [location]);
    useEffect(() => {
        fetchUsersCount();
    }, []);
    return (
        <nav className='flex justify-between px-[30px] py-3'>
            <h1 className='font-extrabold text-lg'>FOOD BLOG</h1>
            <h3 className='text-sm text-red-600 text-center'>{tokenn ? (<div className='flex justify-center items-center font-bold gap-1'><img src={userProfile} alt="userProfle" className='w-[30px] rounded-full' />{userName}</div>) : `${usersCount}k users have registered with us!`}</h3>
            <ul className='flex gap-[40px]'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/recipes">Recipes🍽️</Link></li>
                {tokenn ? <li><Link to="/my-recipes">My Recipe😋</Link></li> : null}
                {tokenn ? <li>Favourites⭐</li> : null}
                <li>{tokenn === null ? <button onClick={() => navigate('/loginSignup')}>Login/Signup</button> : <button onClick={handleLogout}>Logout</button>}</li>
            </ul>
        </nav>
    )
}

export default Navbar
