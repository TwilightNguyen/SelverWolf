
import classNames from 'classnames/bind';

import Sidebar from '../component/Sidebar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles); 

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Sidebar/>
            <div className={cx('chat-content')}>
                {children}
            </div>
        </div> 
    );
}

export default DefaultLayout;