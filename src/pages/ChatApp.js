import React, { useEffect, useState,Suspense } from "react";
import ChatView from "../components/Chatview/ChatView";
import LeftSide from "../components/LeftSide/LeftSide";
import { ChatSelectedContextProvider } from "../contexts/ChatSelectedContext";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import axios from "axios";
import RightSide from "../components/RightSide/RightSide";
import { useHistory } from "react-router";

const ChatApp = (props) => {
  const [users, setusers] = useState([]);
  const [render, setrender] = useState(false)
  
  const colors = [
    "#F47E64",
    "#82D39F",
    "#62D5D1",
    "#DD94BA",
    "#4DB9EF",
    "#B967B9",
  ];
  
  useEffect(async () => {
    
    window.addEventListener('error',(event)=>{
      console.log(event.message)
      
      if(event.message==="Uncaught TypeError: Cannot read properties of undefined (reading 'userName')")
      {window.location.reload()}
      
    })
    //first check database if user does not exists then set user in db firebase
    const docRef = doc(db, "chat", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
   
    
    if (!docSnap.exists()) {
      await setDoc(doc(db, "chat", `${auth.currentUser.uid}`), {
        userName: auth.currentUser.displayName,
        secure: auth.currentUser.uid,
        email: auth.currentUser.email,
        avatar: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    //-------------------------------------------------------------------------
    axios("https://api.chatengine.io/users/", {
      headers: {
        "PRIVATE-KEY": process.env.REACT_APP_PRIVATE_KEY,
      },
      method: "GET",
    }).then((res) => {
      //console.log(res.data);
      setusers(res.data);
      const userFind = res.data.find(
        (item) => item.username === auth.currentUser.displayName
      );
      if (!userFind) {
        axios("https://api.chatengine.io/users/", {
          headers: {
            "PRIVATE-KEY": process.env.REACT_APP_PRIVATE_KEY,
          },
          method: "POST",
          data: {
            username: auth.currentUser.displayName,
            secret: auth.currentUser.uid,
          },
        });
      }
    });
    axios('https://api.chatengine.io/chats/',{
      headers: {
        "Project-ID": process.env.REACT_APP_PROJECT_ID,
        "User-Name": auth.currentUser.displayName,
        "User-Secret": auth.currentUser.uid,
      },
      method:'GET',
    }).then(res=>{
      console.log(res.data,auth.currentUser.displayName)
     const result = res.data.find(item=>
        (item.title === "Mahdi(creator)") && (item.admin.username===auth.currentUser.displayName)
      )
      if((!result)&&(auth.currentUser.displayName !=='Mahdi')){
     axios('https://api.chatengine.io/chats/',{
       headers: {
         "Project-ID": process.env.REACT_APP_PROJECT_ID,
         "User-Name": auth.currentUser.displayName,
         "User-Secret": auth.currentUser.uid,
       },
       method:'PUT',
       data:{
         "usernames":["Mahdi",],
         "title":"Mahdi(creator)",
         "is_direct_chat":true
       }
     }).then(res=>{setrender(!render)})
      }
    });

   

    return () => {};
  }, []);
  return (
    <ChatSelectedContextProvider>
      <div style={{ display: "flex" }}>
        
        <LeftSide
          user={auth.currentUser.displayName}
          secret={auth.currentUser.uid}
          render={render}
        />
          <ChatView />
        <RightSide />
        
      </div>
    </ChatSelectedContextProvider>
  );
};

export default ChatApp;
