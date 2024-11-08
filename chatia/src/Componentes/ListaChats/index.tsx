import './ListaChats.css';
import React from 'react';
import { ListaChatsProps, ChatInterface } from  "../../Interfaces/index.ts";

export default function ListaChats({ chats }: ListaChatsProps) {
    const OpenChat = (chats: ChatInterface) => {
        console.log(chats);
    }

    return (
        <div className='ListaChats'>
            {chats.map((chat, index) => (
                <div className='Div-Button' key={index} onClick={() => OpenChat(chat)}>
                    <label>Id: {chat.id}</label>
                </div>
            ))}
        </div>
    );
}