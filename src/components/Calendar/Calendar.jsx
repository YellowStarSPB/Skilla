import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCalendar, selectDate } from '../../store/filter/filter-slice';

import styles from './Calendar.module.scss';
const calendarPopup = ['3 дня', 'Неделя', 'Месяц', 'Год'];
function Calendar() {
    const dispatch = useDispatch();
    const { calendar } = useSelector((state) => state.filter);
    const date = useSelector((state) => state.filter.date);
    const [showCalendar, setShowCalendar] = useState(false);
    const leftArrow = useRef(null);
    const rightArrow = useRef(null);

    const onClickCalendarArrow = (e, item) => {
        const index = calendarPopup.findIndex((element) => element === item);

        if (e.currentTarget === leftArrow.current) {
            if (index === 0) {
                dispatch(selectCalendar(calendarPopup[calendarPopup.length - 1]));
            } else {
                dispatch(selectCalendar(calendarPopup[index - 1]));
            }
        }

        if (e.currentTarget === rightArrow.current) {
            if (index >= 0 && index < 3) {
                dispatch(selectCalendar(calendarPopup[index + 1]));
            } else {
                dispatch(selectCalendar(calendarPopup[0]));
            }
        }
    };
    const handlChangeCalendar = (item) => {
        dispatch(selectCalendar(item));
        setShowCalendar(!showCalendar);
    };

    return (
        <div className={styles.date}>
            <svg
                width="7"
                height="10"
                viewBox="0 0 7 10"
                fill="none"
                className={styles.arrowLeft}
                ref={leftArrow}
                onClick={(e) => onClickCalendarArrow(e, calendar)}
            >
                <path
                    d="M6.175 8.825L2.35833 5L6.175 1.175L5 0L0 5L5 10L6.175 8.825Z"
                    fill="#ADBFDF"
                />
            </svg>

            <div
                onClick={() => setShowCalendar(!showCalendar)}
                className={styles.calendar}
            >
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                    <path
                        d="M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z"
                        fill="#ADBFDF"
                    />
                </svg>
                <p>{calendar}</p>
            </div>
            <svg
                width="7"
                height="10"
                viewBox="0 0 7 10"
                fill="none"
                className={styles.arrowRight}
                ref={rightArrow}
                onClick={(e) => onClickCalendarArrow(e, calendar)}
            >
                <path
                    d="M6.175 8.825L2.35833 5L6.175 1.175L5 0L0 5L5 10L6.175 8.825Z"
                    fill="#ADBFDF"
                />
            </svg>
            {showCalendar && (
                <ul className={styles.calendarPopup}>
                    {calendarPopup.map((item, index) => (
                        <li
                            className={item === calendar ? styles.active : ''}
                            onClick={() => handlChangeCalendar(item)}
                            key={index}
                        >
                            {item}
                        </li>
                    ))}
                    <div className={styles.dateInput}>
                        <p>Указать даты</p>
                        <div className={styles.dateInput__block}>
                            <input
                                onChange={(e) =>
                                    dispatch(
                                        selectDate({
                                            from: e.target.value,
                                            to: date.to,
                                        }),
                                    )
                                }
                                type="date"
                                value={date.from}
                            />
                            <input
                                onChange={(e) =>
                                    dispatch(
                                        selectDate({
                                            to: e.target.value,
                                            from: date.from,
                                        }),
                                    )
                                }
                                type="date"
                                value={date.to}
                            />
                        </div>
                    </div>
                </ul>
            )}
        </div>
    );
}

export default Calendar;
