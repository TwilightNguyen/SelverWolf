
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Avatar.module.scss';
import { UserIcon } from '../Icons';

const cx = classNames.bind(styles);

const Avatar = ({className})=>{
    return <div className={cx('wrapper', className)}>
        <UserIcon className={cx('icon')} />
    </div>
};

Avatar.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string
}

export default Avatar;