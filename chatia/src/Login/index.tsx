import './Login.css';
import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// npm install js-cookie
import Cookies from 'js-cookie';

const Login = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [viewPw,setViewPw] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<Boolean>(true)
    // const [access_token, setAccess_token] = useState<string>("")

    const navigate = useNavigate();

    const Registrar = () => {
        setIsLogin(false);
    };

    const login = () => {
        setIsLogin(true);
    };

    const singin = async ():Promise<void> => {
        try {
            const result = await axios.post(`http://127.0.0.1:8000/login`, {
                username: username,
                password: password
            },{
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            //setMensagens(result.data); // Atualiza o estado com os dados da resposta
            console.log(result.data.access_token);

            // esse cookie tem 7 dias de tempo de vida;
            // Cookies.set('nomeDoCookie', 'valorDoCookie', { expires: 7 });
            Cookies.set('BEARER_TOKEN', result.data.access_token, { expires: 7 });
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error("Error ao buscar chats:", error);
        }
    };

    const singup = async ():Promise<void> => {
        try {
            const result = await axios.post(`http://127.0.0.1:8000/register`, {
                userName: username,
                password: password
            })
            //setMensagens(result.data); // Atualiza o estado com os dados da resposta
            console.log(result.data.access_token);

            // esse cookie tem 7 dias de tempo de vida;
            // Cookies.set('nomeDoCookie', 'valorDoCookie', { expires: 7 });
            Cookies.set('BEARER_TOKEN', result.data.access_token, { expires: 7 });
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error("Error ao buscar chats:", error);
        }
    };

    const Logar = () => {
        singin();
    }
    
    const Registra = () => {
        console.log("Registrar")
        singup();
    }

    return <div className={`Login ${isLogin ? '' : 'register'}`}>
        <div className='LoginArea'>
            <div className='DivLoginAndRegister'>
                <div onClick={login} className={`${isLogin ? 'activeLogin' : ''}`}>
                    <h1>Login</h1>
                </div>
                <hr style={{ border: '1px solid #333', height: '100%', opacity: 0.5 }} />
                <div onClick={Registrar} className={`${isLogin ? '' : 'activeRegister'}`}>
                    <h1>Registrar</h1>
                </div>
            </div>
            <div className='DivUsername'>
                <label>Usuário:</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username}
                    placeholder='Usuário'
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            isLogin ? Logar() : Registra();
                        }}
                />
            </div>
            <div className='DivPassword'>
                <label>Senha:</label>
                <div className='AreaSenhaView'>
                    <input 
                        type={viewPw ? "text" : "password"} 
                        id="password" 
                        value={password}
                        placeholder='Senha'
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                isLogin ? Logar() : Registra();
                            }}
                    />
                    <div className='ViewPassword' onClick={() => setViewPw(false)} onMouseDown={() => setViewPw(true)}>
                    {viewPw ? 
                        <>
                            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=visibility_off" />
                            <span className="material-symbols-outlined">
                                visibility_off
                            </span>
                        </>
                        :
                        <>
                            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=visibility" />
                            <span className="material-symbols-outlined">
                                visibility
                            </span>
                        </>
                    }
                </div>
                
                

                </div>
            </div>
            <div className='DivButton'>
                <button onClick={isLogin ? Logar : Registra}>
                    {isLogin ? 'SingIn' : 'SingUp'}
                </button>
            </div>
        </div>
    </div>
}

export default Login;