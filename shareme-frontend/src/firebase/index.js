import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyB4xljIB6nEdaKoWehBjD_PRPnsSr7u8X8",
  authDomain: "trim-silicon-365709.firebaseapp.com",
  projectId: "trim-silicon-365709",
  storageBucket: "trim-silicon-365709.appspot.com",
  messagingSenderId: "836382567162",
  appId: "1:836382567162:web:659f8dc265d733543bf743",
  measurementId: "G-DFEWDCFF0V",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);