import { useNavigate } from "react-router-dom";
import assets, { userDummyData } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { authContextProvider } from "../ccontext/AuthContext";
import { chatContext } from "../ccontext/chatContext";

const Sidebar = () => {
  const[input,setInput]=useState(false)
  const navigate = useNavigate();
  const {logout,onlineUsers}=useContext(authContextProvider);
  const {getUSers,users,setSelectedUser,selectedUser,unseenMessages,setUnseenMessages}=useContext(chatContext)
  const handleClick = () => {
    navigate("/profile");
  };
  const filteredUSers=input?users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) :users
  useEffect(()=>{
    getUSers();
  },[onlineUsers])
  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} className="max-w-40" />
          <div className=" relative py-2 group">
            <img src={assets.menu_icon} className="max-h-5 cursor-pointer" />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border text-white border-gray-600 hidden group-hover:block">
              <p className="cursor-pointer text-sm" onClick={handleClick}>
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p onClick={()=>logout()} className="cursor-pointer text-sm">Logout</p>
            </div>
          </div>
        </div>
        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
            <img src={assets.search_icon} className="w-3"/>
            <input type='text' onChange={(e)=>setInput(e.target.value)} className="bg-transparent border-none outline-none text-white text-xs placeholder:[#c8c8c8] flex-1" placeholder="Search user..."/>
        </div>
      </div>
      <div className="flex flex-col">
        {filteredUSers.map((data,index)=>(
            <div onClick={()=>setSelectedUser(data)}className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id==data._id  &&'bg-[#282142]/50'}`}>
                 <img src={data.profilePic || assets.avatar_icon} className="w-[35px] aspect-[1/1] rounded-full"/>
                 <div  className="flex flex-col leading-5">
                   <p>{data.fullName}</p> 
                   {
                    onlineUsers.includes(data._id)?
                    <span className="text-green-400 text-xs">Online</span>:
                    <span  className="text-neutral-400 text-xs">Offline</span>
                   }
                </div>
                {unseenMessages[data._id]>0&& <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/5">{unseenMessages[data._id]}</p>}
            </div>
           
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
