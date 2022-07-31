import React from 'react';
import "./App.css"

const Message = ({ user, message }) => {
    return (
        <div className="message-container">
            <div className="user">name: {user}</div>
            <div className="message">message: {message}</div>
        </div>
    );
}

export default Message;