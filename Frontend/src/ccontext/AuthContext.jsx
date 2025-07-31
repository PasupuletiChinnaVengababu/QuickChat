import { createContext, useEffect, useState } from "react";
import axios from "axios"
import toast from 'react-hot-toast'
import {io} from "socket.io-client"

const backendUrl=import.meta.env.VITE_BACKEND_URL;
console.log(backendUrl)
axios.defaults.baseURL=backendUrl
export const authContextProvider=createContext()

const AuthContext=({children})=>{
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [authuser,setAuthUser]=useState(null);
    const [onlineUser,setOnlineUSer]=useState([]);
    const [socket,setSocket]=useState(null);

    //check user is authenticated

    const checkAuth=async ()=>{
        try{
           const {data}= await axios.get("/api/auth/all")
           console.log(data)
           if(data.success){
            setAuthUser(data.user)
            connectSocket(data.user)
           }
        }
        catch(error){
            toast.error(error.message);
        }
    }
    //connect socket function to handle socket connection
    const connectSocket=(userData)=>{
        if(!userData || socket?.connected){return;}
        const newSocket=io(backendUrl,{
            query:{
                userId:userData._id,
            }
        });
        newSocket.connect();
        setSocket(newSocket);
        newSocket.on("getOnlineUsers",(userIds)=>{
            setOnlineUSer(userIds);
        })
    }
    //Login function to handle user
    const login=async(state,credentials)=>{
        console.log(credentials);
        try{
            const {data}=await axios.post(`/api/auth/${state}`,
                credentials);
            // const {data}=await axios.post(`http://localhost:3000/api/auth/Login`,
            //     credentials);
            
            if(data.success){
                console.log(data)
                setAuthUser(data.user);
                connectSocket(data.user)
                axios.defaults.headers.common["token"]=data.token;
                setToken(data.token)
                localStorage.setItem("token",data.token)
                toast.success(data.message)
            }
            else{
                toast.error("failed");
            }
        }
        catch(error){
             toast.error(error.message);
        }
        
    }
    //logout function
    const logout=async()=>{
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUSer([]);
        axios.defaults.headers.common["token"]=null;
        toast.success("logout successfully");
        socket.disconnect();
    }
    //update profile
    const updateprofile=async(body)=>{
        try{
            const {data}=await axios.put("/api/auth/update-user",body)
            console.log(data)
            if(data.success){
                setAuthUser(data.updateUser);
                toast.success("updated successfully")

            }
            checkAuth();
        }
        catch(error){
             toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"]=token;
            
        }
        checkAuth();
    },[])

    const value={
        axios,
        authuser,
        onlineUser,
        socket,
        login,
        logout,
        updateprofile,
    }
    return(<>
        <authContextProvider.Provider value={value}>
            {children}
        </authContextProvider.Provider>
    </>)
}
export default AuthContext