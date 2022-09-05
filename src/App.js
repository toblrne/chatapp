import React, { useState, useEffect } from 'react';
import './App.css';
import Message from './Message'

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, setValue, set } from "firebase/database";

function App() {
  const [author, setAuthor] = useState("anonymous")
  const [messagesArr, setMessagesArr] = useState([]);

  const [currentMessage, setCurrentMessage] = useState("")
  // const handleMessage = (e) => {
  //   setMessagesArr([...messagesArr, {user: author, message: e.target.value}])
  // }

  const firebaseConfig = {
    apiKey: "AIzaSyAZvOFNKfZGUniUfns6KuZimlCHFmf6lVM",
    authDomain: "chatapp-893e3.firebaseapp.com",
    databaseURL: "https://chatapp-893e3-default-rtdb.firebaseio.com",
    projectId: "chatapp-893e3",
    storageBucket: "chatapp-893e3.appspot.com",
    messagingSenderId: "307097108957",
    appId: "1:307097108957:web:6d6a706b87e55d9b74b634",
    measurementId: "G-2L608MSNPJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  useEffect(() => {
    onValue(ref(db, 'messages/'), (snapshot) => {
      const data = snapshot.val() || []
      setMessagesArr(data)
      console.log(data)
    })
  }, [])

  const handleSend = (currentMessage) => {
    console.log(currentMessage)
    set(ref(db, 'messages/'), messagesArr.concat({ user: author, message: currentMessage }))
  }

  const clearDatabase = () => {
    set(ref(db, 'messages/'), [])
  }

  const showMessage = messagesArr.map(elem => <Message
    user={elem.user}
    message={elem.message} />)

  return (
    <div className="App-container">
      <div className="top-bar">
        <div>
          set name
          <input type='text' onChange={(e) => { setAuthor(e.target.value) }} />
        </div>
        <button onClick={clearDatabase}> clear all messages for everyone </button>
      </div>

      <div className='message-body'>
        <div className="messages-container">{showMessage}</div>
      </div>
      <div className="bottom-bar">
        <div className='message-input'>
          message
          <input type='text' onChange={(e) => { setCurrentMessage(e.target.value) }} />
          <button onClick={() => { handleSend(currentMessage) }}> submit </button>
        </div>
      </div>

    </div>
  );
}

export default App;