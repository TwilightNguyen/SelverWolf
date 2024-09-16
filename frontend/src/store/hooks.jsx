import { useState } from 'react'; 

export const useToken = () => {
    const getToken = () => {
        const userToken = localStorage.getItem('logged_in');
        return userToken;
    };
    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        
        localStorage.setItem('logged_in', true);
        localStorage.setItem('logged_user', userToken[0].username);
        localStorage.setItem('logged_id', userToken[0].id);
        localStorage.setItem('logged_email', userToken[0].email);
        setToken(userToken.token);
        
    };

    return { setToken: saveToken, token };
};
