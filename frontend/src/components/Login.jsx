import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
function Login(){
  const navigate=useNavigate();
   const [identifier,setIdentifier]=useState('');
   const[password,setPassword]=useState('');
    const BACKEND_URL='https://your-thoughts-backend.onrender.com'
  const handleSubmit=async(e)=>{
    e.preventDefault();
     try {
       const response = await axios.post(`${BACKEND_URL}/api/v1/users/login`,
        {
          identifier,
        password
       },
      {withCredentials:true}
      )
       localStorage.setItem("token", response.data.accessToken);
      setIdentifier('')
      setPassword('')
       console.log('User logged in  successfully',response.data.data);
       navigate('/dairy')
   } catch (err) {
    setIdentifier('')
      setPassword('')
     console.error("login error:", err.response?.data || err.message);
      alert("login failed!");
   }
  }
    return (
 <div className="bg-[#5b4a57] w-full min-h-screen flex flex-col justify-center items-center px-4">
  <h1 className="font-bold text-3xl text-white mb-6" style={{ fontFamily: "'Gloria Hallelujah', cursive" }}>
    YourThoughts
  </h1>

  <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-md">
    <form onSubmit={handleSubmit}>
      <h2 className="text-center text-2xl font-semibold mb-6 text-[#5b4a57]">Login</h2>

      <div className="mb-4">
        <label className="block text-[#5b4a57] font-medium mb-1">UserName or Email:</label>
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full border-2 border-[#5b4a57] p-2 rounded bg-transparent text-black"
        />
      </div>

      <div className="mb-6">
        <label className="block text-[#5b4a57] font-medium mb-1">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-2 border-[#5b4a57] p-2 rounded bg-transparent text-black"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#5b4a57] text-white py-3 rounded hover:bg-[#4a3948] transition duration-200"
      >
        Login
      </button>

      <div className="flex flex-col md:flex-row gap-4 mt-6 justify-between items-center">
        <span className="text-[#5b4a57] font-medium text-center">Don't have an account?</span>
        <Link to="/">
          <button className="bg-[#5b4a57] text-white py-2 px-6 rounded hover:bg-[#4a3948] transition duration-200">
            Sign Up
          </button>
        </Link>
      </div>
    </form>
  </div>
</div>


    )
}

export default Login