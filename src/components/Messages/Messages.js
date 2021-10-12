import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ChatSelectedContext } from "../../contexts/ChatSelectedContext";
import Message from "../Message/Message";
import style from "./messages.module.scss";

const Messages = () => {
  const [chatSelected, setChatSelected] = useContext(ChatSelectedContext);
  const [messages, setMessages] = useState([]);
  const [render, setrender] = useState(0);

  const scrollPos = () => {
    const element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
  };
  const timeCalc = (created) => {
    const time = new Date(Date.parse(created));
   // console.log(time)
    const year = time.getFullYear();
    const mounth = time.getMonth();
    const days = time.getDay();
    const hours = time.getHours();
    const min = time.getMinutes();
    const now = new Date();
    if (year !== now.getFullYear()) {
      return time.getDate();
    } else if (mounth !== now.getMonth()) {
      const monthOfYear = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']
      return monthOfYear[mounth];
    } else if (days !== now.getDay()) {
      const weekDays = ['Sat','Sun','Mon','Thursday','Wens','Tuesday','Fri']
      return weekDays[days];
    } else if (hours !== now.getHours()) {
      //console.log("hour", hours + ":" + min);
      return hours + ":" + min;
    } else {
      return hours + ":" + min;
    }
  
  };

  useEffect(() => {
    scrollPos();
  }, [messages]);

  useEffect(() => {
    axios(`https://api.chatengine.io/chats/${chatSelected.chatId}/messages`, {
      headers: {
        "Project-ID": process.env.REACT_APP_PROJECT_ID,
        "User-Name": "Mahdi",
        "User-Secret": process.env.REACT_APP_USER_SECRET,
      },
      method: "GET",
    })
      .then((res) => {
        setMessages(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log("getting messages has error !", e));

    let socket = new WebSocket(
      `wss://api.chatengine.io/chat/?projectID=${process.env.REACT_APP_PROJECT_ID}&chatID=${chatSelected.chatId}&accessKey=${chatSelected.access_key}`
    );
    socket.onopen = (event) => {
      //console.log("first effect", event);

      socket.onerror = (error) => console.log(error);
    };
   // console.log(messages);
    socket.onmessage = (event) => {
      const eventNew = JSON.parse(event.data);
     // console.log(JSON.parse(event.data));
      if (eventNew.action === "new_message") {
        setrender(render + 1);
      }
    };

    return () => {
      setrender(0);
    };
  }, [chatSelected.chatId, render]);
  useEffect(() => {
    return () => {};
  }, [render]);

  return (
    <div className={style.messages} id="messages">
      {messages.map((item) => {
        const time = timeCalc(item.created);
        return (
          <Message
            data={item.text}
            key={item.id}
            sender={item.sender_username}
            time={time}
          />
        );
      })}
    </div>
  );
};

export default Messages;
