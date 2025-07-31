import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { authContextProvider } from "../ccontext/AuthContext";

const Profile=()=>{

    const {authuser,updateprofile}=useContext(authContextProvider)
    const[selectimage,setSelectImage]=useState(null)
    const [name,setName]=useState(authuser.fullname)
    const navigate=useNavigate();
    const [bio,setBio]=useState(authuser.bio);
    const handlesumitted= async(e)=>{
        e.preventDefault();
        if(!selectimage){
            await updateprofile({fullname:name,bio})
            navigate("/");
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(selectimage);
        reader.onload=async ()=>{
            const base64Image=reader.result;
            await updateprofile({profilePic:base64Image,fullname:name,bio})
            navigate("/")
        }
    }
    return(
        
       <>
        <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
        <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
            <form onSubmit={handlesumitted} className="flex flex-col gap-5 p-10 flex-1">
                <h3 className="text-lg">Profile details</h3>
                <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
                    <input id="avatar" onChange={(e)=>setSelectImage(e.target.files[0])} type="file" accept=".png, .jpg, .jpeg" hidden/>
                    <img src={selectimage ? URL.createObjectURL(selectimage):assets.avatar_icon} alt="" className={`w-12 h-12 ${selectimage &&  'rounded-full'}`}/>
                    Upload profile image
                </label>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="your name" className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"/>
                <textarea   value={bio} onChange={(e)=>setBio(e.target.value)} className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500" rows={4}placeholder="Write profile bio"></textarea>
                <button className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer" type="submit">Save</button>
            </form>
            <img src={authuser.profilePic||assets.logo_icon} className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10" alt=""/>
        </div>
        </div>
        </>
    )
}
export default Profile;