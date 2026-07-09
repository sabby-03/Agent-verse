import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfmiffZy8wjxFy19udCogGlRn9X-n5mxc",
  authDomain: "agentverse-9a1d7.firebaseapp.com",
  projectId: "agentverse-9a1d7",
  storageBucket: "agentverse-9a1d7.firebasestorage.app",
  messagingSenderId: "921304311467",
  appId: "1:921304311467:web:47789ac3998982b4c0f9ee"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);