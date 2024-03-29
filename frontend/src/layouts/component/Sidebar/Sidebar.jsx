
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return  (
        <div className={cx('wrapper')}>
            <div className={cx('menu')}>
                Menu
            </div>
            <div className={cx('menu-content')}>
                menu content
            </div>
        </div>
    ) ;
}

export default Sidebar;