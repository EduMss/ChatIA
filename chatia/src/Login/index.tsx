import './Login.css';
import React, {useState} from 'react';

const Login = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [viewPw,setViewPw] = useState<boolean>(false)

    return <div className='Login'>
        <div className='LoginArea'>
            <div className='DivUsername'>
                <label>Usuário:</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username}
                    placeholder='Usuário'
                    onChange={(e) => setUsername(e.target.value)}
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
            <div>
                <button>
                    SingIn
                </button>
            </div>
        </div>
    </div>
}

export default Login;