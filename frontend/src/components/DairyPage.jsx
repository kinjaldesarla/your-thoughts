import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const DairyPage = () => {
  const {dairyId}=useParams()
  const [dairyContent,setDairyContent]=useState('')
  const [diaryEntries,setDairyEntries]=useState([])
  const [editingEntryId, setEditingEntryId] = useState();
const [editedContent, setEditedContent] = useState('');
 const BACKEND_URL='https://your-thoughts-backend.onrender.com'
const navigate =useNavigate();

  useEffect(()=>{
    if(dairyId)fetchDairyEnteries()
  },[])

 const logout=async()=>{
    try {
      const response=await axios.post(`${BACKEND_URL}/api/v1/users/logout`,{},{
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

  const addEntry=async()=>{
    try {
      const response= await axios.post(`${BACKEND_URL}/api/v1/dairy/dairy-page/create-dairy-page/${dairyId}`,
        {
          content:dairyContent
        },
        {
          withCredentials:true
        }
      )
      console.log("entry created",response.data.data);
      setDairyContent('')
      fetchDairyEnteries()
      
    } catch (err) {
      console.log("error while creating dairy entry",err.response?.data || err.message);
      alert('Dairy entry failed')
    }
  }

  const fetchDairyEnteries=async()=>{
    try {
      const response=await axios.get(`${BACKEND_URL}/api/v1/dairy/dairy-page/${dairyId}`,{withCredentials:true})
      setDairyEntries(response.data.data)
      console.log("enteries fetched",response.data.data);
    } catch (err) {
        console.log("error while fetching dairy entry",err.response?.data || err.message);
      alert('entries fetching failed')
    }
  }

  const deleteDairyEnteries=async(entryId)=>{
    try {
      const response= await axios.delete(`${BACKEND_URL}/api/v1/dairy/dairy-page/delete-dairy-page/${entryId}`,
        {withCredentials:true}
      )
      fetchDairyEnteries();
       console.log("dairy entry delted",response.data.data);
    } catch (err) {
       console.log("error while deleting dairy entry",err.response?.data || err.message);
      alert('entry deletion failed')
    }
  }

  const handleUpdateEntry = async (entryId) => {
  try {
    await axios.patch(`${BACKEND_URL}/api/v1/dairy/dairy-page/update-dairy-page/${entryId}`, 
      { content: editedContent },
      { withCredentials: true }
    );
    setEditingEntryId(null);
    setEditedContent('');
    fetchDairyEnteries(); 
  } catch (err) {
    console.error("error while updating entry", err.response?.data || err.message);
    alert("Update failed");
  }
};

  return(
    <div className=" bg-[#fff6f2]  min-h-screen w-full pb-10">
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
<div className="bg-[#fff6f2]  px-6 py-4">
      <h2 className="text-3xl text-[#5b4a57] font-bold mb-6">Your Diary</h2>
      <div className="mb-6">
        <textarea
        placeholder="write your thougths"
        value={dairyContent}
        onChange={(e)=>setDairyContent(e.target.value)}
          className="w-full p-4 border border-[#ccc] rounded-lg focus:outline-none"
        />
        <button
        onClick={addEntry}
          className="mt-3 bg-[#5b4a57] text-white px-5 py-2 rounded hover:bg-[#6a5665]"
        >
          Add Entry
        </button>
      </div>

      <div className="space-y-5">
        {
          diaryEntries.length>0 && (
           diaryEntries.map((diaryEntry)=>(
             <div key={diaryEntry._id} className="bg-white shadow-md rounded-lg p-4 relative">
              <div className="text-sm text-gray-500 mb-2">
                📅 {new Date(diaryEntry.createdAt).toLocaleDateString()}
              </div>
              {
              editingEntryId === diaryEntry._id?(
            
                    <textarea
             value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
             className="w-full border rounded p-2 text-[#5b4a57]"
            />

              ):
                 <p className="text-[#5b4a57]">{diaryEntry.content}</p>
              }
              <div className="absolute top-2 right-2 flex gap-3">
                 <button
        onClick={() => {
          if (editingEntryId === diaryEntry._id) {
            handleUpdateEntry(diaryEntry._id);
          } else {
            setEditingEntryId(diaryEntry._id);
            setEditedContent(diaryEntry.content);
          }
        }}
        className="text-blue-500"
      >
        {editingEntryId === diaryEntry._id ? "✅" : "📝"}
      </button>

                <button onClick={()=>deleteDairyEnteries(diaryEntry._id)} className="text-red-500" >
                  🗑️
                </button>
              </div>
            </div>
         
           ))
          )
        }
      </div>
    </div>
  </div>
  )
};

export default DairyPage;

