import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            const formData = {
                email,
                password
            }
            const response = await axios.post('http://localhost:5000/user/login', formData);
            console.log(response.data);
            alert(response.data.message);
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("username", response.data.data.username);
            localStorage.setItem("userProfile", response.data.data.userProfile);
            navigate("/");
        }
        else {
            const formData = {
                username,
                email,
                password
            }
            const response = await axios.post('http://localhost:5000/user/signup', formData);
            console.log(response.data);
            alert(response.data.message);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.data.username);
            localStorage.setItem("userProfile", response.data.data.userProfile);
        }
    }
    return (
        <section className='h-screen bg-gray-900 flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='bg-gray-700 flex flex-col gap-2 p-3 text-gray-100 shadow shadow-white'>
                {!isLogin && <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='border-b border-white' required />}
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='border-b border-white' required />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='border-b border-white' required />
                <button type="submit" className='p-2 bg-gray-500 active:bg-gray-600 duration-300'>{isLogin ? "Login" : "Signup"}</button>
                <span className='text-sm text-gray-400 hover:underline cursor-pointer hover:text-gray-200 duration-300' onClick={() => setIsLogin(!isLogin)}>{isLogin ? "New User? Signup here" : "Already a User? Login here"}</span>
            </form>
        </section>
    )
}

export default LoginSignup
