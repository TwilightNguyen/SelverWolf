import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';

import { 
    EllipsisVerticalIcon, 
    MicrophoneIcon, 
    MicrophoneSlashIcon, 
    PhoneIcon, 
    PhoneSlashIcon, 
    VideoIcon, 
    VideoSlashIcon, 
    VolumeHighIcon, 
    VolumeXMarkIcon 
} from '../Icons';

import classNames from 'classnames/bind';
import styles from './ReceivingCall.module.scss'; 
import { Wrapper as PopperWrapper } from '../Popper';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ReceivingCall({ws, groupName }){
    const [video, setVideo] = useState(true);
    const [audio, setAudio] = useState(true);
    const [micro, setMicro] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(30);

    useEffect(()=>{
        const timerId = setInterval(() => {
            setTimeRemaining((prevState) => {
                if(prevState <= 1){
                    return 30;
                }else{
                    return(prevState - 1);
                }
            });
        }, 1000);

        return () => clearInterval(timerId);
    },[]);

    const HandleEndCall = () => {
        console.log('send end call');
        ws.current.send(JSON.stringify({type: 'onEndCall'}));
    }

    return <div className={cx('wrapper')}>
        <div className={cx('user-wrapper')}>
            <div className={cx('avatar')}>icon</div>
            <div className={cx('username')}>{groupName}</div>
            <div className={cx('time-remaining')}>{timeRemaining}s</div>
            <div className={cx('loading')}>
                <svg>
                    <circle cx={50} cy={50} r={43}></circle>
                </svg>
            </div>
            <Tippy 
                interactive
                delay={[0,300]}
                trigger='click'
                placement = 'left-end'
                render={()=>(
                    <PopperWrapper>
                        <div className={cx('item')}>
                            <a>Video</a>
                            <div
                                onClick={() => setVideo(!video)}
                            >
                                { video && <VideoIcon className={cx('icon')}/> }
                                { !video && <VideoSlashIcon className={cx('icon')}/> }
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <a>Audio</a>
                            <div
                                onClick={() => setAudio(!audio)}
                            >
                                { audio && <VolumeHighIcon className={cx('icon')} /> }
                                { !audio && <VolumeXMarkIcon className={cx('icon')} /> }
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <a>Microphone</a>
                            <div
                                onClick={() => setMicro(!micro)}
                            >
                                { micro && <MicrophoneIcon className={cx('icon')} /> }
                                { !micro && <MicrophoneSlashIcon className={cx('icon')} /> }
                            </div>
                        </div>
                    </PopperWrapper>
                )}
            >
                <a className={cx('more')}>
                    <EllipsisVerticalIcon className={cx('icon')} />
                </a>
            </Tippy>
        </div>
        <div className={cx('control-wrapper')}>
            <div
                className={cx('reject')}
                onClick={() => HandleEndCall()}
            >
                <PhoneSlashIcon />
            </div>

            <div
                className={cx('accept')} 
            >
                <PhoneIcon />
            </div>

        </div>
    </div>;
}

ReceivingCall.propTypes = {
    ws: PropTypes.object,
    groupName: PropTypes.string
}

export default ReceivingCall;
