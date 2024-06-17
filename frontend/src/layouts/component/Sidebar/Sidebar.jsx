
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

//import { useToken } from '../../../store';
import styles from './Sidebar.module.scss';
import { CommentIcon, GearIcon, UserIcon, WeatherIcon } from '../../../components/icons/icons';
const cx = classNames.bind(styles);

function Sidebar() {  
    //const { token, setToken } = useToken();
    //console.log(valueContext);
    const page = location.pathname.substring 
            (location.pathname.lastIndexOf("/") + 1); 
    //console.log(page);
    return  (
        <div className={cx('wrapper')}> 
            <div className={cx('top')}>
                <Tippy content={<div>Logout</div>} 
                    placement = 'right-start'
                    delay = {[null, 300]}
                > 
                    <a className={cx('user')}> 
                        <UserIcon className={cx('icon')}/>
                    </a>
                </Tippy>
                <a href = './' className={cx('item', page===''?'active':'')}>
                    <CommentIcon className={cx('icon')}/> 
                </a>
            </div>
            <div className={cx('bottom')}>
                <a href = './weather' className={cx('item', page==='weather'?'active':'')} >
                    <WeatherIcon className={cx('icon')}/>
                </a>
                <a href = './setting' className={cx('item',page==='setting'?'active':'')} >
                    <GearIcon className={cx('icon')}/>
                </a>
            </div>
        </div>
    ) ;
}

export default Sidebar;