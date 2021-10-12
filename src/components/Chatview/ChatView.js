import React, { useContext, useEffect, useState,Suspense } from "react";
//import ChatBox from "../ChatBox/ChatBox";

import ChatInfo from "../ChatInfo/ChatInfo";
import style from "./chatview.module.scss";
import { auth, db } from "../../firebase/firebase";
import {  getDoc, doc,  } from "firebase/firestore";
import axios from "axios";
import { ChatSelectedContext } from "../../contexts/ChatSelectedContext";
import { useHistory } from "react-router";
const ChatBox = React.lazy(()=>import('../ChatBox/ChatBox'))
const ChatView = () => {
  
  const history = useHistory()
  const [user, setUser] = useState("");
  const [chatSelected, setChatSelected] = useContext(ChatSelectedContext)
  useEffect(async () => {
    const docRef = doc(db, "chat", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);
    setTimeout(()=>{
      if(!(docSnap.exists()) ){
        console.log(docSnap.data( ))
      
      }
      setChatSelected({
        ...chatSelected,
        loggedUser:docSnap.data().userName
      })
      
      setUser(docSnap.data().userName);
    },1800)
    
   

    let socket = new WebSocket(
      "wss://api.chatengine.io/person/?publicKey=01d2c0ab-4eb4-405b-b0f5-9fd0e5f3da75&username=Mahdi&secret=r4GkWMWxagR4qr0aExQqc9iTAkA3"
    );

    socket.onopen = (event) => console.log("opne", event);
    socket.onclose = (event) => console.log(event);
    socket.onmessage = (event) => console.log("Mssg", JSON.parse(event.data));
    socket.onerror = (error) => console.log(error);
    return () => {
      socket.close();
    };
  }, [user]);
  return (
    
      <div className={style.container}>
        <ChatInfo />
        <Suspense fallback={<div>loadung....</div>} >
        <ChatBox user={user} secret={auth.currentUser.uid} />
        </Suspense >
      </div>
    
  );
};

export default ChatView;
