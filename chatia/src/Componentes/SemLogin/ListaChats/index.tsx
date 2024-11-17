import './ListaChats.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

const ListaChats: React.FC = () => {
    const navigate = useNavigate();

    const Login = () => {
        navigate("/login");
        window.location.reload();
    }

    return (
        <div className='ListaChats'>
            <div className='Chats'>
            </div>
            <div className='Settings'>
                <div className='Div-Button' onClick={Login}>
                    <label>Login</label>
                </div>
            </div>

        </div>
    );
};


export default ListaChats;