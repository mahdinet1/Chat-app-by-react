import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import style from "./Login.module.scss";
import { auth } from "../firebase/firebase";
import googleLogo from '../assets/images/search.png'
import "firebase/app";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

const Login = () => {
  const loginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  useEffect(() => {
    getRedirectResult(auth).then((res) => {
      console.log(res);
    });
    return () => {};
  }, []);
  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.title}>
          Hi this is a CHAT App by <p>Mahdi zeynali</p>
        </div>
        <div className={style.logo}>
          <img src={googleLogo} />
        </div>
        <div className={style.login}>
      <Button variant="primary" size="lg" active onClick={loginHandler}>
        Login with Google
      </Button>
      </div>
      </div>
    </div>
  );
};

export default Login;
