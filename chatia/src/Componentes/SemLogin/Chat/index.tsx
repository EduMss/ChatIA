import React, {useEffect, useState} from "react";
import './Chat.css';
import ChatMensagem from "../ChatMensagem/index.tsx";
import ListaChats from "../../../Componentes/SemLogin/ListaChats/index.tsx";


export default function Chat(){
    return( // ChatMensagemLogin
        <div className="Chat">
            <ListaChats />

            <ChatMensagem />            
        </div>
    );
}