
import { useState, useEffect } from 'react';
import className from 'classnames/bind';

import { postRequest } from '../../utils/services';

import styles from './Login.module.scss';

const cx = className.bind(styles);

async function loginUser(credentials) {
    return postRequest('/user/login',JSON.stringify(credentials));
}

function Login({setToken}) {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    
    // useEffect(()=>{
    //     localStorage.removeItem('logged_in');
    //     localStorage.removeItem('logged_user');
    //     localStorage.removeItem('logged_email');
    // },[]);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const token = await loginUser({
            email,
            password,
        });

        console.log(token);
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
