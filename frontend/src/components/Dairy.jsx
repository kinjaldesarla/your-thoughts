import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Dairy (){
   const[dairies,setDairies]=useState([])
   const[dairyName,setDairyName]=useState('')
  const navigate=useNavigate();
  const fetchDairies=async()=>{
    try {
      const response= await axios.get("http://localhost:3000/api/v1/dairy/", {
  withCredentials: true
});
      console.log("dairies",response.data.data);
      setDairies(response.data.data)
    } catch (err) {
      console.error("Error fetching dairies:", err.response?.data || err.message);
    }
  }
  
  useEffect(()=>{
    fetchDairies()
  },[])

 const logout=async()=>{
    try {
      const response=await axios.post("http://localhost:3000/api/v1/users/logout",{},{
        withCredentials:true
      })
    localStorage.removeItem("token");
       console.log('User logged out successfully',response.data.data);
       navigate("/login")
       
   } catch (err) {
     console.error("logout error:", err.response?.data || err.message);
      alert("logout failed!");
   }
  }

  const createDairy=async()=>{
    try {
      const response=await axios.post("http://localhost:3000/api/v1/dairy/create-dairy",
     { dairyName},
        {
          withCredentials:true
        }
      )
      setDairyName('')
      console.log("dairy created",response.data.data)
      fetchDairies();
    } catch (err) {
          console.error("dairy creation error:", err.response?.data || err.message);
      alert("Dairy is not created");
    }
    
  }

  const handleSubmit=async(e)=>{
        e.preventDefault();
     createDairy();
  }

  const deleteDairy=async(dairyId)=>{
    try {
      console.log(dairyId);
      const response=await axios.delete(`http://localhost:3000/api/v1/dairy/delete-dairy/${dairyId}`,{
        withCredentials:true
      })
      fetchDairies()
      console.log("dairy delted",response.data.data);
    } catch (err) {
       console.error("dairy deletion error:", err.response?.data || err.message);
      alert("Dairy is not deleted");
    }
  }

    return(
     <div className="bg-[#fff6f2] min-h-screen w-full pb-10">
  <nav className="flex justify-between items-center py-6 px-8 bg-[#5b4a57] ">
    <h1
      className="font-bold text-3xl text-white"
      style={{ fontFamily: "'Gloria Hallelujah', cursive" }}
    >
      YourThoughts
    </h1>
    <div className="flex gap-5 items-center text-white text-lg">
        <button
          onClick={logout}
          className="bg-white text-[#4a3948] font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-200 transition"
        >
          Logout
        </button>
    </div>
  </nav>

  <form onSubmit={handleSubmit} className="mt-10 px-8">
    <div className="flex items-center gap-4">
      <label className="text-[#4a3948] text-lg">Dairy Name:</label>
      <input
        type="text"
        value={dairyName}
        onChange={(e) => setDairyName(e.target.value)}
        className="px-4 py-2 rounded border border-white bg-white text-[#4a3948] focus:outline-none w-60 shadow"
        placeholder="Enter dairy title"
      />
      <button
        type="submit"
        className="bg-[#5b4a57] text-[#fff6f2] font-semibold px-6 py-2 rounded-lg hover:bg-[#4a3948] transition"
      >
        Create
      </button>
    </div>
  </form>

  <div className="flex flex-wrap gap-6 px-8 mt-10">
    {dairies.length > 0 &&
      dairies.map((dairy) => (
        <Link to={`/dairypage/${dairy._id}`} key={dairy._id}>
          <div className=" bg-white  w-52 h-64 relative shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer  overflow-hidden">
            <div className="bg-[#5b4a57]  px-4 py-3  flex justify-between items-center text-white font-bold text-lg">
              <h1 className="truncate w-32">{dairy.dairyName}</h1>
              <div
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                  deleteDairy(dairy._id);
                }}
                className="text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 
                      1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 
                      2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 
                      5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 
                      .562c.34-.059.68-.114 1.022-.165m0 0a48.11 
                      48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 
                      51.964 0 0 0-3.32 0c-1.18.037-2.09 
                      1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </div>

            <div className=" h-full px-4 py-3 text-[#5b4a57] font-medium">
              <p className="text-sm opacity-80">Created On:</p>
              <div className="text-sm opacity-80"> {new Date(dairy.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        </Link>
      ))}
  </div>
</div>

    )
}

export default Dairy;