import React, { useState, useEffect } from 'react';
import './App.css';
import Message from './Message'

import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, onValue } from "firebase/database";
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

  const app = initializeApp(firebaseConfig)
  const database = getDatabase();

  const [author, setAuthor] = useState("anonymous")
  const [messagesArr, setMessagesArr] = useState([{ user: "Ryan", message: "Hello" }, { user: "Lincoln", message: "Bruh" }]);

  const messagesRef = ref(database, "messages/container");
  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setMessagesArr([]);
      } else {
        setMessagesArr(data);
      }
    });
  }, []);

  const addMessageToDatabase = (messageObject) => {
    set(ref(database, 'messages/container'), messagesArr.concat(messageObject));
  }

  const clearDatabase = () => {
    set(ref(database, 'messages/container'), []);
  }

  const [currentMessage, setCurrentMessage] = useState()
  // const handleMessage = (e) => {
  //   setMessagesArr([...messagesArr, {user: author, message: e.target.value}])
  // }



  const showMessage = messagesArr.map(elem => <Message user={elem.user} message={elem.message} />)





  return (
    <div className="App-container">
      <div className="top-bar">
        <div>
          set name
          <input type='text' onChange={(e) => { setAuthor(e.target.value) }} />
        </div>
        <button onClick={() => { clearDatabase() }}> clear all messages for everyone </button>
      </div>

      <div className='message-body'>
        <div className="messages-container">{showMessage}</div>
      </div>

      <div className="bottom-bar">
        <div className='message-input'>
          message
          <input type='text' onChange={(e) => { setCurrentMessage(e.target.value) }} />

          <button onClick={() => { addMessageToDatabase({ user: author, message: currentMessage }) }}> submit </button>
        </div>
      </div>

    </div>
  );
}

export default App;
