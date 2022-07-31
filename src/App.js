import React, { useState } from 'react';
import './App.css';
import Message from './Message'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function App() {

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAZvOFNKfZGUniUfns6KuZimlCHFmf6lVM",
    authDomain: "chatapp-893e3.firebaseapp.com",
    projectId: "chatapp-893e3",
    storageBucket: "chatapp-893e3.appspot.com",
    messagingSenderId: "307097108957",
    appId: "1:307097108957:web:6d6a706b87e55d9b74b634",
    measurementId: "G-2L608MSNPJ",
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  
  const [author, setAuthor] = useState("")
  const [message, setMessage] = useState({user:"Ryan", message: "Hello"})

  const handleSubmit = (e) => {
    setMessage({ ...message, user: author, message: e.target.value})
  }
  


  return (
    <div>
      set name
      <input type='text' onChange={(e) => {setAuthor(e.target.value)}} />

      message
      <input type='text' onChange={handleSubmit} />

      

    </div>
  );
}

export default App;
