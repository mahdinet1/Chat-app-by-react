import React, { useEffect, useState } from "react";
import style from "./rightSide.module.css";
import { auth } from "../../firebase/firebase";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
const RightSide = () => {
  const [user, setUser] = useState({});
  const history =useHistory()
  const signOutHandler = ()=>{
      auth.signOut();
      history.push('/');
  }
  useEffect(() => {
    const user = auth.currentUser;
    console.log(user);
    setUser(user);
    return () => {};
  }, []);
  return (
    <div className={style.container}>
      <div className={style.info}>
        <div className={style.image}>
          <img src={user.photoURL} />
        </div>
        <div className={style.userInfo}>
          <h4 className={style.name}>
            <label>
              Your name:<span>{user.displayName}</span>
            </label>
          </h4>
          <p className={style.email}>
            <label>Your email address :</label>
            <p>{user.email}</p>
          </p>
        </div>
      </div>
      <div className={style.devider}>
        <p>------------------- info ----------------------</p>
      </div>
      <div className={style.appInfo}>
        <h6>App Information</h6>
        This app is created for more exercise and training by Mahdi zeynali.
        <div>
        <di className={style.devider}>
            <p >--------------- conatct info -------------------</p>
        </di>
          <p>email : mahdizeynali1@gmail.com</p>
          <p>Linkdin:
               <a href="http://linkedin.com/in/mahdi-zeynali-1b5694201">
                   http://linkedin.com/in/mahdi-zeynali-1b5694201
                   </a>
            </p>
        </div>
        <div className={style.button}>            
             <Button variant="dark" onClick={signOutHandler}>Sign out</Button>
      </div>
      </div>
     
    </div>
  );
};

export default RightSide;
