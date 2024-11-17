import './ListaChats.css';
import React from 'react';
import { ListaChatsPropsLogout, ChatInterface } from  "../../../Interfaces/index.ts";
import { useNavigate } from "react-router-dom";

const ListaChats: React.FC<ListaChatsPropsLogout> = ({chats, setSelectedChat }) => {
    const navigate = useNavigate();
    const OpenChat = (chats: ChatInterface) => {
        setSelectedChat(chats);
        //console.log(chats);
    }

    const Login = () => {
        navigate("/login");
        window.location.reload();
    }

    // const ResetChats = () => {
    //     localStorage.removeItem('chats');
    // }

    // const NovoChat = () => {
    //     // id: number;
    //     // user_1_id: string;
    //     // user_2_id?: string;
    //     // start_date: string;
    //     // end_date?: string;
    //     // status: string;
    //     const novoChat: ChatInterface = {
    //         id: 1,
    //         user_1_id: "",
    //         user_2_id: "",
    //         start_date: "2024-11-07 14:30:00.000",
    //         status: "active"
    //     }


    //     localStorage.removeItem('chats');
    // }

    return (
        <div className='ListaChats'>
            <div className='Chats'>
                {chats.map((chat, index) => (
                    <div className='Div-Button' key={index} onClick={() => OpenChat(chat)}>
                        <label>Id: {chat.id}</label>
                    </div>
                ))}
            </div>
            <div className='Settings'>
                {/* <div className='Div-Button' onClick={ResetChats}>
                    <label>Limpar chats</label>
                </div>
                <div className='Div-Button' onClick={NovoChat}>
                    <label>Novo chat</label>
                </div> */}
                <div className='Div-Button' onClick={Login}>
                    <label>Login</label>
                </div>
            </div>

        </div>
    );
};


export default ListaChats;