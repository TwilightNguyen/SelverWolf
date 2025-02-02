
import classNames from "classnames/bind";

import styles from "./Theme.module.scss";
import { MoonIcon, SunIcon } from "../Icons";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);
const themeStore = localStorage.getItem('theme') !== null  ? localStorage.getItem('theme') : 'light';

function Theme() {
    const [theme, setTheme] = useState(themeStore);
 
    const HandleTheme = (newTheme) =>{
        if(newTheme == 'light'){
            localStorage.setItem('theme', 'light');
            setTheme('light');
        }else{
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
        }
    }

    useEffect(()=>{
        if(theme === 'light'){
            document.querySelector('body').classList.remove('theme-dark');
        }else{
            document.querySelector('body').classList.add('theme-dark');
        }
    },[theme])

    return <div className={cx('wrapper')}>
        <div className={cx('toggle' , theme )}>
            <div
                className={cx('toggle-btn', 'light', theme=='light'&&'active')} 
                onClick={() => HandleTheme('light')}
            >
                <SunIcon />
            </div>
            <div
                className={cx('toggle-btn', theme=='dark'&&'active')} 
                onClick={() => HandleTheme('dark')}
            >
                <MoonIcon />
            </div>
        </div>
    </div>
}

export default Theme;