import React, { useContext, useEffect, useState } from "react";
import style from "./chatinfo.module.scss";
import logo from "../../assets/images/icons8-user-50.png";
import { ChatSelectedContext } from "../../contexts/ChatSelectedContext";
const ChatInfo = () => {
  const [chatSelected, setChatSelected] = useContext(ChatSelectedContext);
  const [shortName, setshortName] = useState("");
  useEffect(() => {
    const array = chatSelected.chatName.split(" ");
    let firstLetter = "";
    let secoundLetter = "";
    if (array.length > 0) {
      firstLetter = array[0][0];
    }
    if (array[1]) {
      secoundLetter = array[1][0];
    }

    setshortName((firstLetter + secoundLetter).toUpperCase());
    return () => {
      setshortName("");
    };
  }, [chatSelected.chatName]);

  return (
    <div className={style.container}>
      <div className={style.avatar}>
        {chatSelected.chatName ? <span className={style.shortname}>{shortName}</span> : <img src={logo} />}
      </div>
      <div className={style.name}>
        {chatSelected.chatName ? chatSelected.chatName : "please select chat"}
      </div>
    </div>
  );
};

export default ChatInfo;
