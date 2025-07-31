import { createContext, useContext, useEffect, useState } from "react";
import { authContextProvider } from "./AuthContext";
import { sendMessage } from "../../../backend/controller/messageController";

export const chatContext=createContext();

export const chatProvider=({children})=>{
    const [message,setMessage]=useState([]);
    const [users,setUsers]=useState([]);
    const [selectedUser,setSelectedUser]=useState(null);
    const [unseenMessages,setUnseenMessages]=useState({})
    const {socket,axios}=useContext(authContextProvider)

    //all users
    const getUSers=async()=>{
        try{
           const {data}= await axios.get("/api/messages/users");
           if(data.success){
            setUsers(data.users)
            setUnseenMessages(data.unseenMessages);
           }

        }
        catch (error){
            toast.error(error.message)
        }
    }
    // selected user
    const getMessages=async(userId)=>{
        try{
            const {data}=await axios.get(`/api/message/${userId}`);
            if(data.success){
                setMessage(data.messages)
            }
        }
        catch(error){
             toast.error(error.message)
        }
    }
    //send message to selected user
    const sedMessage=async(messageData)=>{
        try{
                const {data}=await axios.post(`/api/messages/send/${selectedUser._id}`,messageData)
                if(data.success){
                    setMessage((prev)=>[...prev,data.newMessage])
                }
                else{
                    toast.error(data.message)
                }
        }
        catch(error){
            toast.error(error.message)
        }
    }
    //subscribe to message for selected user
    const subscribetomessage=()=>{
        if(!socket){
            return
        }
        socket.on("newMessage",(newMessage)=>{
            if(selectedUser && newMessage.senderId=== selectedUser._id){
                newMessage.seen=true;
                setMessage((prev)=>[...prev,newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`)

            }
            else{
                setUnseenMessages((prev)=>({
                        ...prev,[newMessage.senderId]:prev[newMessage.senderId]?prev[newMessage.senderId]+1:1
                }))
            }
        })
    }
    //unsubscribe
    const unSubscribe=()=>{
        if(socket) socket.off("newMessage")

    }
    useEffect(()=>{
        subscribetomessage();
        return()=>unSubscribe();
        
    },[socket,setSelectedUser])
    const value={
        message,users,selectedUser,getUSers,setMessage,sendMessage,setSelectedUser,
        unseenMessages,setUnseenMessages
    }
    return
    (
        <chatContext.Provider value={value}>
            {children}
        </chatContext.Provider>
    )
}