

import { useState } from 'react';
import className from 'classnames/bind';

import styles from './Login.module.scss';

const cx = className.bind(styles);


async function loginUser(credentials) {
    //console.log(credentials);
    return fetch(`http://localhost:3000/api/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}

function Login({setToken}) {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        const token = await loginUser({
            email,
            password,
        });

        //console.log(token);
        //navigate(-1);
        
        setToken(token);
        location.replace('/');
    };

    return <div className={cx('wrapper')}>
        <div className={cx('login-form')}>
            <div className={cx('login-title')}>
                Whale
            </div>
            <input className={cx('email')} 
                placeholder = 'Email' 
                onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input className={cx('password')} 
                placeholder = 'Password' 
                type='password'
                onChange={(e)=>{setPassword(e.target.value)}}
            />
            <button className={cx('btn-login')}
                onClick={(e)=>{handleLogin(e)}}
            >
                Login
            </button>
            <a href='#'>Forgot password</a>
            <a href='#'>Register</a>
        </div>
    </div>;
}

export default Login;
