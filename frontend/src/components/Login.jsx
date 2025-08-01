import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
function Login(){
  const navigate=useNavigate();
   const [identifier,setIdentifier]=useState('');
   const[password,setPassword]=useState('');
  const handleSubmit=async(e)=>{
    e.preventDefault();
     try {
       const response = await axios.post('http://localhost:3000/api/v1/users/login',
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
   <div className="bg-[#5b4a57] w-full h-screen">
  <h1
    className="font-bold text-3xl text-center p-8 pb-6 text-white"
    style={{ fontFamily: "'Gloria Hallelujah', cursive" }}
  >
    YourThoughts
  </h1>

  <div className=" w-2/5 h-3/5 bg-white rounded-lg p-6 m-auto shadow-md">
    <form onSubmit={handleSubmit}>
      <h2 className="text-center text-2xl font-semibold mb-6 text-[#5b4a57]">Login</h2>

      <div className="flex items-center gap-2 mb-4 ">
        <label className=" w-38 text-left text-[#5b4a57] font-medium pl-0">UserName or Email:</label>
        <input
          type="text"
          value={identifier}
          onChange={(e)=>setIdentifier(e.target.value)}
          className=" flex-1 border-2 border-[#5b4a57] p-2 rounded bg-transparent text-black"
        />
      </div>

      <div className="flex items-center gap-2 mb-6">
        <label className="w-38 text-left text-[#5b4a57] font-medium">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="flex-1 border-2 border-[#5b4a57] p-2 rounded bg-transparent text-black"
        />
      </div>

      <button
        type="submit"
       className="mx-auto my-7 block bg-[#5b4a57] text-white py-3 w-1/2 rounded hover:bg-[#4a3948] transition duration-200"
      >
        Login
      </button>
      <div className="flex gap-6 my-7 justify-around items-center">
      <div className="text-[#5b4a57] font-medium text-center">Create a account</div>
      <Link to="/">
        <button  className=" bg-[#5b4a57] text-white py-3 px-10  rounded hover:bg-[#4a3948] transition duration-200">
        SingUp</button>
      </Link>
        </div>
    </form>
  </div>
</div>

    )
}

export default Login