
import { useState } from 'react';
import className from 'classnames/bind';

import { postRequest } from '../../utils/services';

// import images from '../../assets/images';
import styles from './Login.module.scss';

const cx = className.bind(styles);

async function loginUser(credentials) {
    return postRequest('/user/login',JSON.stringify(credentials));
}

async function loginRegister(credentials) {
    return postRequest('/user/register',JSON.stringify(credentials));
}


function Login({setToken}) {
    const [state, setState] = useState(true);
    //For login
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    
    //For Register
    const [userNameRegister, setUserNameRegister] = useState('');
    const [emailRegister, setEmailRegister] = useState('');
    const [birthDayRegister, setBirthDayRegister] = useState('');
    const [genderRegister, setGenderRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [confirmPasswordRegister, setConfirmPasswordRegister] = useState('');
    
    // useEffect(()=>{
    //     localStorage.removeItem('logged_in');
    //     localStorage.removeItem('logged_user');
    //     localStorage.removeItem('logged_email');
    // },[]);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const token = await loginUser({
            email: emailLogin,
            password: passwordLogin,
        });

        setToken(token);
        location.replace('/');
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if(userNameRegister == ''){
            alert('Please Enter User Name.');
            return;
        }

        if(emailRegister == ''){
            alert('Please Enter Email.');
            return;
        }

        if(birthDayRegister == ''){
            alert('Please Enter Birth Day.');
            return;
        }

        if(+genderRegister < 0){
            alert('Please Select Gender.');
            return;
        }

        if(passwordRegister == ''){
            alert('Please Enter Password.');
            return;
        }
        
        if(passwordRegister != confirmPasswordRegister){
            alert('Confirm password incorrect.');
            return;
        }

        const res = await loginRegister({
            userName: userNameRegister,
            email: emailRegister,
            birthDay: birthDayRegister,
            gender: genderRegister,
            password: passwordRegister,
        });
        console.log(res);
    };

    return <div className={cx('wrapper')}>
        <div className={cx('login-form', state&&'active')}>
            <div className={cx('login-title')}>
                Whale
            </div>
            <input className={cx('email')} 
                placeholder = 'Email' 
                type='text'
                onChange={(e)=>{setEmailLogin(e.target.value)}}
            />
            <input className={cx('password')} 
                placeholder = 'Password' 
                type='password'
                onChange={(e)=>{setPasswordLogin(e.target.value)}}
            />
            <button className={cx('btn-login')}
                onClick={(e)=>{handleLogin(e)}}
            >
                Login
            </button>
            <a href='#'>Forgot password</a>
            <p>Don't have an account?&nbsp; 
                <a href='#'
                    onClick={() => setState(!state)}
                >
                    Register
                </a>
            </p>
        </div>

        <div className={cx('register-form', !state&&'active')}>
            <div className={cx('login-title')}>
                Whale
            </div>
            <input className={cx('username')} 
                placeholder = 'User Name' 
                type='text'
                onChange={(e)=>{setUserNameRegister(e.target.value)}}
            />
            <input className={cx('email')} 
                placeholder = 'Email' 
                type='text'
                onChange={(e)=>{setEmailRegister(e.target.value)}}
            />
            <input className={cx('birthday')} 
                placeholder = '' 
                type='date'
                onChange={(e)=>{setBirthDayRegister(e.target.value)}}
            />
            <select 
                className={cx('gender')}
                onChange={(e)=>{setGenderRegister(e.target.value)}}
            >
                <option value="-1">-- Select Gender --</option>
                <option value="0">Male</option>
                <option value="1">Female</option>
                <option value="2">Other</option>
            </select>
            <input className={cx('password')} 
                placeholder = 'Password' 
                type='password'
                onChange={(e)=>{setPasswordRegister(e.target.value)}}
            />
            <input className={cx('confirm-password')} 
                placeholder = 'Confirm Password' 
                type='password'
                onChange={(e)=>{setConfirmPasswordRegister(e.target.value)}}
            />
            <button className={cx('btn-register')}
                onClick={(e)=>{handleRegister(e)}}
            >
                Register
            </button>
            <p>Already have an account?&nbsp; 
                <a href='#'
                    onClick={() => setState(!state)}
                >
                    Login
                </a>
            </p>
        </div>
    </div>;
}

export default Login;
