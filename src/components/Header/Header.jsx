import React from 'react';
import search from '../../assets/img/header/search.svg';
import avatar from '../../assets/img/header/avatar.png';
import arrowDown from '../../assets/img/arrow_down.svg';

import styles from './Header.module.scss';
function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.leftWrapper}>
                <p className={styles.date}>Среда, 13 окт</p>

                <div className={styles.infoBlock}>
                    <div className={styles.infoBlock__item}>
                        <p>
                            Новые звонки <span>20 из 30 шт</span>
                        </p>
                        <div className={styles.status}>
                            <div className={styles.statusPercent}></div>
                        </div>
                    </div>

                    <div className={styles.infoBlock__item}>
                        <p>
                            Качество разговоров <span>40%</span>
                        </p>
                        <div className={styles.status}>
                            <div className={styles.statusPercent}></div>
                        </div>
                    </div>

                    <div className={styles.infoBlock__item}>
                        <p>
                            Конверсия в заказ <span>67%</span>
                        </p>
                        <div className={styles.status}>
                            <div className={styles.statusPercent}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.rightWrapper}>
                <div className={styles.seacrh}>
                    <img src={search} alt="search" />
                </div>
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
