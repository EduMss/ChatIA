import './ListaChats.css';
import React from 'react';
import { ListaChatsProps, ChatInterface } from  "../../Interfaces/index.ts";

const ListaChats: React.FC<ListaChatsProps> = ({chats, setSelectedChat }) => {
    const OpenChat = (chats: ChatInterface) => {
        setSelectedChat(chats);
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
};


export default ListaChats;