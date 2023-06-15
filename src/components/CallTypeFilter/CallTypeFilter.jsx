import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectType } from '../../store/filter/filter-slice';

import styles from './CallTypeFilter.module.scss';

const callType = ['Все типы', 'Входящие', 'Исходящие'];

function CallType() {
    const dispatch = useDispatch();
    const { type } = useSelector((state) => state.filter);
    const [showCallType, setShowCallType] = useState(false);

    return (
        <div onClick={() => setShowCallType(!showCallType)} className={styles.callType}>
            <p className={type !== 'Все типы' ? styles.active : ''}>{type}</p>

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
                            className={item === type ? styles.active : ''}
                            onClick={() => dispatch(selectType(item))}
                            key={index}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CallType;
