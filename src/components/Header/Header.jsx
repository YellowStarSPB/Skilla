import React, { useEffect, useState } from 'react';
import search from '../../assets/img/header/search.svg';
import avatar from '../../assets/img/header/avatar.png';
import arrowDown from '../../assets/img/arrow_down.svg';

import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from '../SearchInput/SearchInput';
function Header() {
    const dispatch = useDispatch();
    const callsLength = useSelector((state) => state.calls.calls.length);

    const isNewCount = useSelector((state) => {
        let newArr = [];
        state.calls.calls.forEach((item) =>
            item.results.length !== 0 ? newArr.push(item.results[0].type) : '',
        );
        return newArr.length;
    });

    return (
        <header className={styles.header}>
            <div className={styles.leftWrapper}>
                <p className={styles.date}>Среда, 13 окт</p>

                <div className={styles.infoBlock}>
                    <div className={styles.infoBlock__item}>
                        <p>
                            Новые звонки{' '}
                            <span
                                style={{
                                    color: '#28a879',
                                }}
                            >
                                {isNewCount} из {callsLength} шт
                            </span>
                        </p>
                        <div className={styles.status}>
                            <div
                                style={{
                                    width: `${(isNewCount / callsLength) * 100}px`,
                                    background: '#28a879',
                                }}
                                className={styles.statusPercent}
                            ></div>
                        </div>
                    </div>

                    <div className={styles.infoBlock__item}>
                        <p>
                            Качество разговоров{' '}
                            <span
                                style={{
                                    color: '#FFD500',
                                }}
                            >
                                40%
                            </span>
                        </p>
                        <div className={styles.status}>
                            <div
                                style={{
                                    width: `40%`,
                                    background: '#FFD500',
                                }}
                                className={styles.statusPercent}
                            ></div>
                        </div>
                    </div>

                    <div className={styles.infoBlock__item}>
                        <p>
                            Конверсия в заказ{' '}
                            <span
                                style={{
                                    color: '#EA1A4F',
                                }}
                            >
                                67%
                            </span>
                        </p>
                        <div className={styles.status}>
                            <div style={{
                                    width: `67%`,
                                    background: '#EA1A4F',
                                }} className={styles.statusPercent}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.rightWrapper}>
                <SearchInput header={true}/>
                <div className={styles.nameWrapper}>
                    <p>ИП Сидорова Александра Михайловна</p>
                    <img src={arrowDown} alt="arrow down" />
                </div>
                <div className={styles.account}>
                    <div className={styles.account__avatar}>
                        <img src={avatar} alt="avatar" />
                    </div>
                    <img src={arrowDown} alt="arrow down" />
                </div>
            </div>
        </header>
    );
}

export default Header;
