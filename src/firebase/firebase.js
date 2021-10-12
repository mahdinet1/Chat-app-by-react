import * as firebase from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"

const app =firebase.initializeApp({
    apiKey: "AIzaSyD_Devv8sTzCpvwtcETt9CagRG2a7EBr_E",
  authDomain: "chatfirebase-53b4a.firebaseapp.com",
  projectId: "chatfirebase-53b4a",
  storageBucket: "chatfirebase-53b4a.appspot.com",
  messagingSenderId: "743853552775",
  appId: "1:743853552775:web:1e0a1a2d159d29e597b422"
})
export const db = getFirestore()
export const auth = getAuth()
