import './ChatMensagemLogin.css';
import React, { useEffect, useState, useRef } from 'react';
import { Mensagem, GetMensagens } from '../../../Interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';

const ChatMensagemLogin: React.FC<Mensagem> = ({user, chat}) => {
    let [mensagens, setMensagens] = useState<GetMensagens>([]);
    let [novaMensagem, setNovaMensagem] = useState<string>("");
    const mensagemRef = useRef<HTMLDivElement | null>(null); // Array de refs

    // const isWebKit = () => {
    //     return /AppleWebKit/i.test(navigator.userAgent);
    // };

    const getMensagens = async ():Promise<void> => {
        const Bearer_token = Cookies.get('BEARER_TOKEN');
        try {
            const result = await axios.get(`http://127.0.0.1:8000/chats/${chat.id}/messages`, {
                headers: {'Authorization': `Bearer ${Bearer_token}`}
            })
            setMensagens(result.data); // Atualiza o estado com os dados da resposta
            //console.log(result.data);
        } catch (error) {
            console.error("Error ao buscar chats:", error);
        }
    };

    const postMensagem = async ():Promise<void> => {
        const Bearer_token = Cookies.get('BEARER_TOKEN');
        try {
            const result = await axios.post(`http://127.0.0.1:8000/chats/${chat.id}/messages`, {
                sender: "user",
                message: novaMensagem,
                date: "2024-11-07T14:32:00"
        }, {
            headers: {'Authorization': `Bearer ${Bearer_token}`}
        })
            //setMensagens(result.data); // Atualiza o estado com os dados da resposta
            //console.log(result.data);
        } catch (error) {
            console.error("Error ao buscar chats:", error);
        }
    };

    const scrollToBottom = () => {
        // Verifica se a referência da última mensagem foi definida
        if (mensagemRef.current) {
            // Rola até a última mensagem
            mensagemRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        getMensagens();// Chama a função ao montar o componente
    }, [chat]);

    useEffect(()=>{
        scrollToBottom();
    }, [mensagens])

    const EnviarMensagem = async () => {
        await postMensagem();
        await getMensagens();
        setNovaMensagem("");
    };

    // const EnviarMensagemENTER = (event) => {
    //     if (event.key === 'Enter'){
    //         console.log("Enviar mensagem com o ENTER");
    //     }
    // }

    // const handlerFuntion = () => {
    //     console.log("Enviar dadadada mensagem com o ENTER");
    // }

    return (
        <div className='ChatMensagem'>
            <div className={`Mensagem {isWebKit() ? '' : 'scrollable-div'}`}>
                {mensagens && mensagens.map((mensagem, index) => (
                    mensagem.sender === "user" ? 
                    <div className='MensagemUser' key={index} style={{color:'yellow'}}>
                        <label>{mensagem.message}</label>
                    </div>
                    :
                    <div className='MensagemBot' key={index} style={{color:'red'}}>
                        <label>{mensagem.message}</label>
                    </div>
                ))}
                <div ref={mensagemRef}></div>
            </div>
            <div className='InputMensagem'>
                <input 
                    type="text" 
                    placeholder="Mensagem para a IA"
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            EnviarMensagem();
                        }}
                />
                <div className='ButtonSend' onClick={EnviarMensagem} >
                    {/* Tem que colocar a tag <link> no public/index.html */}
                    <span className="material-symbols-outlined" style={{fontSize: '36px', color: 'whitesmoke'}}>send</span>
                </div>
            </div>
        </div>
    );
};

export default ChatMensagemLogin;