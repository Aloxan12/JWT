import React from 'react';
import styles from './NotFound.module.css'
import paper from '../../utils/images/paper.png'
import {Tooltip} from "../../Common/Components/Tooltip/Tooltip";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const arrNotFoundText = [
    'page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404',
    'page not found 404 page not found 404 page not error error 404 404 404 404 404 404 error error found 404 page not found 404 page not found 404 page not found 404 error 404 error page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page 404 404 404 404 404 404 404 not found 404',
    'error page not found error page not found error page not found  e404 404 404 404 404 404 404 not found error page not found e404 404 404 404 404 404 404 not found error page not found e404 404 404 404 404 404 404 not found error page not found e404 404 404 404 404 404 404 not found error page not found',
    '404 404 404 404 404 404 404 page not found 404 404 404 404 404 404 404 404 404 404 404 404 404 404 404 404 404 404 404 error error error error 404 404 404 404 error error error error 404 404 404 404 404 404 404 404  404 page not found 404 page not found 404  404 page not found 404 page not found 404',
    'page not found 404 page not found 404 page not found 404  404 404 404 404 404 404 404 page not found 404 page not found 404 page not found 404',
    'error error error error error error page not found 404 page not found error error error 404 page not found 404 page not found 404 page not found 404 page not found 404',
    '404 404 404 404 404 404 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 404 page not found 404 page not found 404 page not found 404 page 404 404 404 404 404 404 404 not found 404 404 page not found 404 page not found 404 page not found 404 page 404 404 404 404 404 404 404 not found 404 ',
    'found error page not found error 404 404 404 404 404 404 404 page not found error 404 404 404 404 404 404 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404',
    'page not found 404 page not found 404 page not found 404  404 404 404 404 404 404 404 404 404 404 404 404 404 404 page not found 404 page not found 404 page not found 404 404 404 404 404 404 404 404',
    '  404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404',
    '404 page not found 404 page not found 404 page not found 404 page not 404 page not found 404 found 404 page not found 404 page not found 404  404 found 404 page not found 404 page not found 404  404 found 404 page not found 404 page not found 404  404 found 404 page not found 404 page not found 404  404 found 404 page not found 404 page not found 404',
    'error error page not found 404 page not found 404 page not found 404 page not found 404 404 404 404 404 404 404 404 page not found 404 page not found 404',
    '404 page not found 404 404 404 404 404 404 404 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404  404 found 404 page not found 404 page not found 404',
    'page not found 404 page not found 404 page not found 404 page not found 404 404 page not found 404 page not found 404 page not found 404  404 found 404 page not found 404 page not found 404  404 found 404 page not found 404 page not found 404',
    'error 404 error page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page 404 404 404 404 404 404 404 not found 404',
    ' 404 page not found 404 page not found 404 page not found 404 page not found 404 404 page 404 page not found 404 404 404 404 404 404 404 404 not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found 404 page not found',
]

export const NotFound = () => {
    const navigate = useNavigate()
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth)
    return (
        <div className={styles.NotFoundWrap}>
            <img src={paper} alt={'not found'}/>
            <div className={styles.NotFoundText}>404</div>
            <div className={styles.runningStringBlock}>
                {arrNotFoundText.map((item, i) => <div key={`not found key ${i}`}>
                    <span className={styles.runningStringText}>{item}</span>
                </div>)}
                <div>
                    <span>not found 404</span>
                </div>
            </div>
            <div className={styles.onGoMainBtn}>
                <Tooltip content="Вернуться на главную" textColor='green'>
                    <div className={styles.redTablet} onClick={()=>navigate(isAuth ? '/' : '/login')}>
                    </div>
                </Tooltip>
            </div>
            <div className={styles.onClosesBtn}>
                <Tooltip content="Покинуть сайт" textColor='green'>
                    <a href="https://www.google.com/">
                        <div className={styles.blueTablet}>
                        </div>
                    </a>
                </Tooltip>
            </div>
        </div>
    );
};