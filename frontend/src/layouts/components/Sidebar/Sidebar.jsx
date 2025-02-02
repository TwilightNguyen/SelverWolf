
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

//import { useToken } from '../../../store';
import { Wrapper as PopperWrapper } from '../../../components/Popper';
import styles from './Sidebar.module.scss';
import Theme from '../../../components/Theme';
import { 
    CommentIcon,
    GearIcon, 
    UserIcon, 
    ContactsIcon
} from '../../../components/Icons';
    
const cx = classNames.bind(styles);

function Sidebar() {  
    //const { token, setToken } = useToken();
    //console.log(valueContext);
    const page = location.pathname.substring 
        (location.pathname.lastIndexOf("/") + 1); 

    const handleSignOut = ()=>{
        localStorage.removeItem('logged_email');
        localStorage.removeItem('logged_id');
        localStorage.removeItem('logged_in');
        localStorage.removeItem('logged_user');

        location.reload();
    }

    //console.log(page);
    return  (
        <div className={cx('wrapper')}> 
            <div className={cx('user')}> 
                <UserIcon className={cx('icon')}/>
            </div>
            <div className={cx('nav')}>
                
                <a href = './' className={cx('item', page===''?'active':'')}>
                    <CommentIcon className={cx('icon')}/> 
                </a>
                <a href = './contact' className={cx('item',page==='contact'?'active':'')} >
                    <ContactsIcon className={cx('icon')}/>
                </a>

                <div className={cx('border')}></div>
                <Tippy
                    interactive
                    delay={[0,300]}
                    trigger='click'
                    placement = 'right-end'
                    render={()=>(
                        <PopperWrapper>
                            <Theme />
                            <div className={cx('setting-popup')}>
                                <button 
                                    className={cx('sign-out')}
                                    onClick={()=>{handleSignOut();}}
                                >
                                    Sign out
                                </button> 
                            </div>
                        </PopperWrapper>
                    )}
                >
                    <a className={cx('item' ,page==='setting'?'active':'')} >
                        <GearIcon className={cx('icon')}/>
                    </a>
                </Tippy>
            </div>
        </div>
    ) ;
}

export default Sidebar;