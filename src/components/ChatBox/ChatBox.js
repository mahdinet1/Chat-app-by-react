import React, { useEffect, useState,useContext } from "react";
import style from "./chatbox.module.scss";
import { sendMessage } from "react-chat-engine";
import Messages from "../Messages/Messages";
import { GrAttachment } from "react-icons/gr";
import { BsEmojiSmile } from "react-icons/bs";
import axios from "axios";
import { ChatSelectedContext } from "../../contexts/ChatSelectedContext";
const ChatBox = ({ user,secret }) => {
  const [access_key, setaccess_key] = useState("");
  const [inputValue, setinputValue] = useState('')
  const [chatSelected, setChatSelected] = useContext(ChatSelectedContext)
  let socket;
  useEffect(() => {
    //console.log(user)
    axios
      .get(`https://api.chatengine.io/chats/${chatSelected.chatId}/`, {
        headers: {
          "Project-ID": process.env.REACT_APP_PROJECT_ID, 
          "User-Name":user,
          "User-Secret": secret,
        },
      })
      .then((res) => {
        //console.log(res);
        setaccess_key(res.data.access_key);
      });
    return () => {};
  }, [user]);
  useEffect(() => {
    
    socket = new WebSocket(
      `wss://api.chatengine.io/chat/?projectID=${process.env.REACT_APP_PROJECT_ID}&chatID=${chatSelected.chatId}4&accessKey=${access_key}`
    );
    if (access_key) {
      socket.onopen = (event) => {
        //console.log("chat", event);
      };

      socket.onmessage = (event) => console.log(event);
    }
    return () => {};
  }, [access_key]);
  const sendHandler = (e) => {
    e.preventDefault();
    setinputValue('')
    axios(`https://api.chatengine.io/chats/${chatSelected.chatId}/messages/`, {
      headers: {
        "Project-ID": process.env.REACT_APP_PROJECT_ID,
        "User-Name":`${user}`,
        "User-Secret": secret,
      },
      method: "POST",
      data: {
        text: `${inputValue}`,
        sender_user: `${user}`,
      },
    })
      .then((res) => console.log(res))
      .catch((e) => console.log("axios", e));
  };
  return (
    <div className={style.container}>
      <Messages />
      <div className={style.sendsection}>
        <form onSubmit={sendHandler}>
          <input
            type="text"
            placeholder="write a message..."
            className={style.inputbox}
            value={inputValue}
            onChange={(event)=>setinputValue(event.target.value)}
          />
          <div>
            <button>
              <BsEmojiSmile />
            </button>
            <button>
              <GrAttachment />
            </button>

            <button type="submit">send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
