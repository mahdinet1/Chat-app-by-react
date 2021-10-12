import React, { useContext, useEffect, useState } from "react";
import style from "./left.module.scss";
import SummeryMssg from "../SummeryMssg/SummeryMssg";
import { AiOutlineDown } from "react-icons/ai";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { ChatSelectedContext } from "../../contexts/ChatSelectedContext";
import { useHistory } from "react-router";
const LeftSide = ({ user, secret,render }) => {
  const [chats, setchats] = useState([]);
  const [flag, setflag] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [chatSelected, setChatSelected] = useContext(ChatSelectedContext);
  const history = useHistory()
  const timeCalc = (created)=>{
    const time =new Date(Date.parse(created) )
        const year = time.getFullYear()
        const mounth = time.getMonth()
        const days =  time.getDay()
        const hours = time.getHours()
        const min = time.getMinutes()
        const now = new Date();
         if(year!==now.getFullYear()){
            return(time.getDate())
            console.log('year')
         }
         else if(mounth!==now.getMonth()){
          const monthOfYear = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']
          return monthOfYear[mounth];
           console.log('mounth')
         }
         else if(days!==now.getDay()){
          //console.log('day')
          const weekDays = ['Sat','Sun','Mon','Thursday','Wens','Tuesday','Fri']
          return weekDays[days];
           
         }
         else if(hours!==now.getHours()){
           return(hours + ':'+ min)
           console.log('hour',hours + ':'+ min)
         }
         else{
           return(hours + ':'+ min)
           console.log('min')
         }
         //console.log(passedTime,now)
  }
  useEffect(async () => {
  
    //------------------------------------------------------
    //console.log(user, secret);
    axios
      .get("https://api.chatengine.io/chats/", {
        headers: {
          "Project-ID": process.env.REACT_APP_PROJECT_ID,
          "User-Name": user,
          "User-Secret": secret,
        },
      })
      .then((response) => {
        setchats(response.data);
      
        
      });
      const docRef = doc(db, "chat", secret);
      const docSnap = await getDoc(docRef);
     setAvatar(docSnap.data().avatar)
      
    let socket = new WebSocket(
      "wss://api.chatengine.io/person/?publicKey=01d2c0ab-4eb4-405b-b0f5-9fd0e5f3da75&username=Mahdi&secret=r4GkWMWxagR4qr0aExQqc9iTAkA3"
    );

    socket.onmessage = (event) => {
      console.log('event left',JSON.parse(event.data))
      
      setflag(!flag);
    };
  }, [flag,render]);
  const clcikHandlerCard = (uid, title, key) => {
  
    setChatSelected({
      ...chatSelected,
      chatId: uid,
      chatName: title,
      access_key: key,
    });
  };
  const cutString = (string)=>{
    if(string.length > 14){
      return (string.slice(0,14) + ' ...')
    }
    return string;
  }
  return (
    
    <div className={style.container}>
      
      <div className={style.header}>
        <p>All Messages</p>
        <div>
          <AiOutlineDown />
        </div>
      </div>
      {chats.map((item) => {
        const passedTime =timeCalc(item.last_message.created)
        const mssg = cutString(item.last_message.text)
        return (
          <SummeryMssg
            bgColor={avatar}
            name={item.title}
            lastMssg={mssg}
            key={item.id}
            id={item.id}
            time={passedTime}
            click={() => clcikHandlerCard(item.id, item.title, item.access_key)}
          />
        );
      })}
    </div>
  );
};

export default LeftSide;
