import React, { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
function SignUp(){
  const navigate=useNavigate();
   const [username,setUsername]=useState('');
   const[email,setEmail]=useState('');
   const[password,setPassword]=useState('');
   const BACKEND_URL='https://your-thoughts-backend.onrender.com'
  const handleSubmit=async(e)=>{
    e.preventDefault();
     try {
       const response = await axios.post(`${BACKEND_URL}/api/v1/users/register`,
        {
        username,
        email,
        password
       },
      {withCredentials:true}
      )
      setUsername('')
      setEmail('')
      setPassword('')
       console.log('User register successfully',response.data.data);
       navigate('/dairy')
   } catch (err) {
      setUsername('')
      setEmail('')
      setPassword('')
     console.error("Registration error:", err.response?.data || err.message);
      alert("Registration failed!");
   }
  }
    return (
   <div className="bg-[#5b4a57] w-full h-screen">
  <h1
    className="font-bold text-3xl text-center p-8 pb-6 text-white"
    style={{ fontFamily: "'Gloria Hallelujah', cursive" }}
  >
    YourThoughts
  </h1>

  <div className=" w-2/5 h-4/5 bg-white rounded-lg p-6 m-auto shadow-md">
    <form onSubmit={handleSubmit}>
      <h2 className="text-center text-2xl font-semibold mb-6 text-[#5b4a57]">Sign Up</h2>

      <div className="flex items-center gap-2 mb-4 ">
        <label className="w-20 text-left text-[#5b4a57] font-medium pl-0">UserName:</label>
        <input
          type="text"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
          className="flex-1 border-2 border-[#5b4a57] p-2 rounded bg-transparent text-black"
        />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <label className="w-20 text-left text-[#5b4a57] font-medium">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
          className="flex-1 border-2 border-[#5b4a57] p-2 rounded bg-transparent text-black"
        />
      </div>

      <div className="flex items-center gap-2 mb-6">
        <label className="w-20 text-left text-[#5b4a57] font-medium">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
          className="flex-1 border-2 border-[#5b4a57] p-2 rounded bg-transparent text-black"
        />
      </div>

      <button
        type="submit"
       className="mx-auto my-4 block bg-[#5b4a57] text-white py-3 px-6 rounded hover:bg-[#4a3948] transition duration-200"
      >
        Create Account
      </button>
      <div className="flex gap-6 my-10 justify-around items-center">
      <div className="text-[#5b4a57] font-medium text-center">Already having account?</div>
      <Link to="/login">
        <button  className=" bg-[#5b4a57] text-white py-3 px-10  rounded hover:bg-[#4a3948] transition duration-200">
        login</button>
      </Link>
        </div>
    </form>
  </div>
</div>

    )
}

export default SignUp