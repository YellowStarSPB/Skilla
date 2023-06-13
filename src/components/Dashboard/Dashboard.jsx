import React, { useState } from 'react';
import plusImg from '../../assets/img/dashboard/plus.svg';
import arrow from '../../assets/img/dashboard/arrow.svg';
import calendar from '../../assets/img/dashboard/calendar.svg';

import styles from './Dashboard.module.scss';
import { useSelector } from 'react-redux';
import CallItem from '../CallItem/CallItem';

const callType = ['Все типы', 'Входящие', 'Исходящие'];
function Dashboard() {
    const { calls } = useSelector((state) => state.calls);
    console.log(calls.map((item) => item));
    const [inputValue, setInputValue] = useState('');

    const [showCallType, setShowCallType] = useState(false);
    const [currentCallType, setCurrentCallType] = useState(0);

    return (
        <section className={styles.dashboard}>
            {/* баланс и дата */}
            <div className={styles.balanceAndDate}>
                <div className={styles.balance}>
                    <p>
                        Баланс: <span>272 ₽</span>
                    </p>
                    <img src={plusImg} alt="plus" />
                </div>
                <div className={styles.date}>
                    <img className={styles.arrowLeft} src={arrow} alt="arrow" />
                    <div className={styles.calendar}>
                        <img src={calendar} alt="calendar" />
                        <p>3 дня</p>
                    </div>
                    <img className={styles.arrowRight} src={arrow} alt="arrow" />
                </div>
            </div>
            {/* поиск и варианты сортировки */}
            <div className={styles.filtersAndSearch}>
                <label
                    className={`${styles.search} ${inputValue ? styles.borderInput : ''}`}
                >
                    <svg
                        className={styles.searchIcon}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.4351 10.0629H10.7124L10.4563 9.81589C11.3528 8.77301 11.8925 7.4191 11.8925 5.94625C11.8925 2.66209 9.23042 0 5.94625 0C2.66209 0 0 2.66209 0 5.94625C0 9.23042 2.66209 11.8925 5.94625 11.8925C7.4191 11.8925 8.77301 11.3528 9.81589 10.4563L10.0629 10.7124V11.4351L14.6369 16L16 14.6369L11.4351 10.0629ZM5.94625 10.0629C3.66838 10.0629 1.82962 8.22413 1.82962 5.94625C1.82962 3.66838 3.66838 1.82962 5.94625 1.82962C8.22413 1.82962 10.0629 3.66838 10.0629 5.94625C10.0629 8.22413 8.22413 10.0629 5.94625 10.0629Z"
                            fill="#ADBFDF"
                        />
                    </svg>

                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        placeholder="Поиск по звонкам"
                    />

                    {inputValue && (
                        <svg
                            className={styles.btn}
                            onClick={() => setInputValue('')}
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                                fill="#ADBFDF"
                            />
                        </svg>
                    )}
                </label>
                <div className={styles.filtersWrapper}>
                    <div
                        onClick={() => setShowCallType(!showCallType)}
                        className={styles.callType}
                    >
                        <p className={currentCallType !== 0 ? styles.active : ''}>
                            {callType[currentCallType]}
                        </p>

                        <svg
                            className={showCallType ? styles.rotate : ''}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M7.41 8.59009L12 13.1701L16.59 8.59009L18 10.0001L12 16.0001L6 10.0001L7.41 8.59009Z"
                                fill="#ADBFDF"
                            />
                        </svg>
                        {showCallType && (
                            <ul className={styles.typePopup}>
                                {callType.map((item, index) => (
                                    <li
                                        className={
                                            index === currentCallType ? styles.active : ''
                                        }
                                        onClick={() => setCurrentCallType(index)}
                                        key={index}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div
                        // onClick={() => setShowCallType(!showCallType)}
                        className={styles.callType}
                    >
                        <p>Все сотрудники</p>

                        <svg
                            // className={showCallType ? styles.rotate : ''}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M7.41 8.59009L12 13.1701L16.59 8.59009L18 10.0001L12 16.0001L6 10.0001L7.41 8.59009Z"
                                fill="#ADBFDF"
                            />
                        </svg>
                        {/* {showCallType && (
                            <ul className={styles.typePopup}>
                                {callType.map((item, index) => (
                                    <li onClick={() =>setCurrentCallType(index)} key={index}>{item}</li>
                                ))}
                            </ul>
                        )} */}
                    </div>

                    <div
                        // onClick={() => setShowCallType(!showCallType)}
                        className={styles.callType}
                    >
                        <p>Все звонки</p>

                        <svg
                            // className={showCallType ? styles.rotate : ''}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M7.41 8.59009L12 13.1701L16.59 8.59009L18 10.0001L12 16.0001L6 10.0001L7.41 8.59009Z"
                                fill="#ADBFDF"
                            />
                        </svg>
                        {/* {showCallType && (
                            <ul className={styles.typePopup}>
                                {callType.map((item, index) => (
                                    <li onClick={() =>setCurrentCallType(index)} key={index}>{item}</li>
                                ))}
                            </ul>
                        )} */}
                    </div>

                    <div
                        // onClick={() => setShowCallType(!showCallType)}
                        className={styles.callType}
                    >
                        <p>Все источники</p>

                        <svg
                            // className={showCallType ? styles.rotate : ''}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M7.41 8.59009L12 13.1701L16.59 8.59009L18 10.0001L12 16.0001L6 10.0001L7.41 8.59009Z"
                                fill="#ADBFDF"
                            />
                        </svg>
                        {/* {showCallType && (
                            <ul className={styles.typePopup}>
                                {callType.map((item, index) => (
                                    <li onClick={() =>setCurrentCallType(index)} key={index}>{item}</li>
                                ))}
                            </ul>
                        )} */}
                    </div>

                    <div
                        // onClick={() => setShowCallType(!showCallType)}
                        className={styles.callType}
                    >
                        <p>Все оценки</p>

                        <svg
                            // className={showCallType ? styles.rotate : ''}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M7.41 8.59009L12 13.1701L16.59 8.59009L18 10.0001L12 16.0001L6 10.0001L7.41 8.59009Z"
                                fill="#ADBFDF"
                            />
                        </svg>
                        {/* {showCallType && (
                            <ul className={styles.typePopup}>
                                {callType.map((item, index) => (
                                    <li onClick={() =>setCurrentCallType(index)} key={index}>{item}</li>
                                ))}
                            </ul>
                        )} */}
                    </div>

                    <div
                        // onClick={() => setShowCallType(!showCallType)}
                        className={styles.callType}
                    >
                        <p>Все ошибки</p>

                        <svg
                            // className={showCallType ? styles.rotate : ''}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M7.41 8.59009L12 13.1701L16.59 8.59009L18 10.0001L12 16.0001L6 10.0001L7.41 8.59009Z"
                                fill="#ADBFDF"
                            />
                        </svg>
                        {/* {showCallType && (
                            <ul className={styles.typePopup}>
                                {callType.map((item, index) => (
                                    <li onClick={() =>setCurrentCallType(index)} key={index}>{item}</li>
                                ))}
                            </ul>
                        )} */}
                    </div>
                </div>
            </div>
            <div className={styles.callsWrapper}>
                <div className={styles.columnInfo}>
                    <p>Тип</p>
                    <p>Время</p>
                    <p>Сотрудник</p>
                    <p>Звонок</p>
                    <p>Источник</p>
                    <p>Оценка</p>
                    <p>Длительность</p>
                </div>

                {calls.map((item) => (
                    <CallItem key={item.id} {...item} />
                ))}
            </div>
        </section>
    );
}

export default Dashboard;
