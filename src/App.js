import React, { useState, useEffect } from 'react';
import './App.css';
import Message from './Message'

function App() {

  const [author, setAuthor] = useState("anonymous")
  const [messagesArr, setMessagesArr] = useState([{ user: "Ryan", message: "Hello" }, { user: "Lincoln", message: "Bruh" }]);

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
        <button onClick={() => { }}> clear all messages for everyone </button>
      </div>

      <div className='message-body'>
        <div className="messages-container">{showMessage}</div>
      </div>
      <div className="bottom-bar">
        <div className='message-input'>
          message
          <input type='text' onChange={(e) => { setCurrentMessage(e.target.value) }} />

          <button onClick={() => { }}> submit </button>
        </div>
      </div>

    </div>
  );
}

export default App;