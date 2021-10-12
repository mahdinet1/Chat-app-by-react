import React,{useEffect, useState} from "react";
import style from "./summeryMssg.module.scss";

const SummeryMssg = ({bgColor,name,lastMssg,id,click,time}) => {
  const [shortName, setshortName] = useState('')
  const [idSelected, setidSelected] = useState(null)
  useEffect(() => {
    const array=name.split(' ')
    let firstLetter=''
    let secoundLetter = ''
    if(array.length>0){
      firstLetter = array[0][0]
      if(array[1]){
        secoundLetter = array[1][0]
      }
      
      setshortName((firstLetter+secoundLetter).toUpperCase())
    }
    return () => {
      setshortName('')
    }
  }, [])
  
  return (
    
    <div className={style.card} onClick={click}>
      <div className={style.avatar} style={{background:`${bgColor}`}}>
        {shortName}
      </div>
      <div className={style.body}>
          <div className={style.title}>{name}
          <span>{time}</span>
          </div>
          <p className={style.recentMssg}>{lastMssg}</p>
      </div>
    </div>

  );
};

export default SummeryMssg;
