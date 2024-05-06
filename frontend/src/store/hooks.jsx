import { useState } from 'react'; 

export const useToken = () => {
    const getToken = () => {
        const userToken = sessionStorage.getItem('logged_in');
        return userToken;
    };
    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        sessionStorage.setItem('logged_in', true);
        sessionStorage.setItem('logged_user', JSON.stringify(userToken[0].username));
        sessionStorage.setItem('logged_email', JSON.stringify(userToken[0].email));
        setToken(userToken.token);
    };

    return { setToken: saveToken, token };
};
