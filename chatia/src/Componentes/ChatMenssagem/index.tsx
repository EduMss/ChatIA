import './ChatMenssagem.css';
import React from 'react';

const ChatMenssagem = () => {
    return (
        <div className='ChatMenssagem'>
            <div className='Menssagem'>

            </div>
            <div className='InputMenssagem'>
                <input type="text" placeholder="Menssagem para a IA"/>
            </div>
        </div>
    );
};

export default ChatMenssagem;