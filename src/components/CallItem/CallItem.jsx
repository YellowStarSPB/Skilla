import React, { useEffect, useState } from 'react';
//img
import incoming from '../../assets/img/dashboard/incoming.svg';
import incomingError from '../../assets/img/dashboard/incomingError.svg';
import outgoing from '../../assets/img/dashboard/outgoing.svg';
import outgoingError from '../../assets/img/dashboard/outgoingError.svg';
import earth from '../../assets/img/dashboard/earth.svg';
import greenDots from '../../assets/img/dashboard/greenDots.svg';
import phone from '../../assets/img/dashboard/phone.svg';
import infoImg from '../../assets/img/dashboard/info.svg';
import playImg from '../../assets/img/audio/play.svg';
import downloadImg from '../../assets/img/audio/download.svg';
import closeImg from '../../assets/img/close.svg';
//styles
import styles from './CallItem.module.scss';
//конвертация времени
const durationCall = (time) => {
    const timestamp = time;
    const hours = Math.floor(timestamp / 60 / 60);
    const minutes = Math.floor(timestamp / 60) - hours * 60;
    const seconds = timestamp % 60;
    return `${hours !== 0 ? hours + ':' : ''}${minutes}:${
        seconds < 10 ? '0' + seconds : seconds
    }`;
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
    record,
    partnership_id,
    to_number,
}) {
    const [recordData, setRecordData] = useState({});
    const [errorFetch, setErrorFetch] = useState('');

    const context = new AudioContext();

    if (record) {
        useEffect(() => {
            getRecord();
        }, []);
    }
    function getRecord() {
        fetch(
            `https://api.skilla.ru/mango/getRecord?record=${record}&partnership_id=${partnership_id}`,
            {
                method: 'POST',
                headers: {
                    'Content-type':
                        'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
                    'Content-Transfer-Encoding': 'binary',
                    'Content-Disposition': 'filename=record.mp3',
                    Authorization: 'Bearer testtoken',
                },
            },
        )
            .then((response) => response.arrayBuffer())
            .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
            .then((audioBuffer) => {
                setRecordData(audioBuffer);
            })
            .catch((err) => {
                setErrorFetch(err);
            });
    }

    function play(audioBuffer) {
        const source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(context.destination);
        source.start();
    }
    return (
        <div className={styles.callItem}>
            <div className={styles.callItem__checkBox}>
                <input onChange={() => console.log(1)} type="checkbox" />
                <label></label>
            </div>

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
            <div className={styles.callItem__phone}>
                <img
                    className={styles.callItem__phone_phoneImg}
                    src={phone}
                    alt="phone"
                />
                {in_out === 1 ? <p>{from_number}</p> : <p>{to_number}</p>}
            </div>
            <div className={styles.callItem__source}>{source}</div>
            <div className={styles.callItem__estimation}>
                {errors[0] && (
                    <div style={{ display: 'flex' }}>
                        <p className={styles.callItem__estimation_error}>{errors[0]}</p>
                        <img
                            className={styles.callItem__estimation_infoImg}
                            src={infoImg}
                            alt="info"
                        />
                    </div>
                )}
                {!errors[0] && (
                    <div style={{ display: 'flex' }}>
                        <img
                            className={styles.callItem__estimation_dotsImg}
                            src={greenDots}
                            alt="dots"
                        />
                        <p className={styles.callItem__estimation_info}>Отлично</p>
                        <img
                            className={styles.callItem__estimation_infoImg}
                            src={infoImg}
                            alt="info"
                        />
                    </div>
                )}
                {errorFetch ? (
                    <h2>Упс, произошла ошибка</h2>
                ) : (
                    record && (
                        <div className={styles.callItem__estimation_play}>
                            <p>{durationCall(time)}</p>
                            <button
                                onClick={() => play(recordData)}
                                className={styles.callItem__estimation_play_Btn}
                            >
                                <img src={playImg} alt="play" />
                            </button>
                            <div className={styles.callItem__estimation_play_time}>
                                <div
                                    className={styles.callItem__estimation_play_timeLine}
                                ></div>
                            </div>
                            <div className={styles.callItem__estimation_play_download}>
                                <img src={downloadImg} alt="downloadImg" />
                            </div>
                            <div className={styles.callItem__estimation_play_close}>
                                <img src={closeImg} alt="close" />
                            </div>
                        </div>
                    )
                )}
            </div>
            {time !== 0 && (
                <div className={styles.callItem__duration}>{durationCall(time)}</div>
            )}
        </div>
    );
}

export default CallItem;
