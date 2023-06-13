import React from 'react';
import incoming from '../../assets/img/dashboard/incoming.svg';
import incomingError from '../../assets/img/dashboard/incomingError.svg';
import outgoing from '../../assets/img/dashboard/outgoing.svg';
import outgoingError from '../../assets/img/dashboard/outgoingError.svg';
import earth from '../../assets/img/dashboard/earth.svg';
import greenDots from '../../assets/img/dashboard/greenDots.svg';

import styles from './CallItem.module.scss';
//конвертация времени
const timeCall = (time) => {
    const timestamp = time;
    const hours = Math.floor(timestamp / 60 / 60);
    const minutes = Math.floor(timestamp / 60) - hours * 60;
    const seconds = timestamp % 60;
    return `${hours !== 0 ? hours + ':' : ''}${minutes}:${seconds}`;
};

function CallItem({
    source,
    errors,
    person_avatar,
    in_out,
    from_site,
    partner_data,
    time,
    status,
    date,
    from_number,
}) {
    return (
        <div className={styles.callItem}>
            <div className={styles.callItem__type}>
                {status === 'Не дозвонился' ? (
                    <img
                        src={in_out === 1 ? incomingError : outgoingError}
                        alt="incoming"
                    />
                ) : (
                    <img src={in_out === 1 ? incoming : outgoing} alt="incoming" />
                )}
            </div>

            <p className={styles.callItem__time}>{date.slice(11, 16)}</p>

            <div className={styles.callItem__employee}>
                <div className={styles.callItem__employee_avatar}>
                    <img src={person_avatar} alt="avatar" />
                </div>

                {from_site ? (
                    <div className={styles.callItem__employee_earth}>
                        <img src={earth} alt="earth" />
                    </div>
                ) : null}
            </div>
            <div className={styles.callItem__phone}>{<p>{from_number}</p>}</div>
            <div className={styles.callItem__source}>{source}</div>
            <div className={styles.callItem__estimation}>
                {errors[0] && (
                    <p className={styles.callItem__estimation_error}>{errors[0]}</p>
                )}
                {!errors[0] && (
                    <>
                        <img src={greenDots} alt="dots" />
                        <p className={styles.callItem__estimation_info}>Отлично</p>
                    </>
                )}
            </div>
            {time !== 0 && (
                <div className={styles.callItem__duration}>{timeCall(time)}</div>
            )}
        </div>
    );
}

export default CallItem;
