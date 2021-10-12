import React, { useEffect,useContext } from 'react'
import { ChatSelectedContext } from '../../contexts/ChatSelectedContext'
import style from './message.module.scss'
const Message = ({data,sender,time}) => {
    const [chatSelected, setChatSelected] = useContext(ChatSelectedContext)
    useEffect(() => {
       // console.log(sender,chatSelected.loggedUser)
        return () => {
            
        }
    }, [])
    return (
        <div>
        <div className={`${style.container} ${chatSelected.loggedUser===sender ? style.myMssg:style.otherMssg}`}>
            <p>{data}  <span className={chatSelected.loggedUser===sender ? style.myMssgTime:style.otherMssgTime}>{time}</span></p>
           
        </div>
        </div>
    )
}

export default Message
