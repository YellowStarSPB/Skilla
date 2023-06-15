import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectVisibleCall } from '../../store/calls/calls-slice';

import CallItem from '../CallItem/CallItem';
import Calendar from '../Calendar/Calendar';
import CallTypeFilter from '../CallTypeFilter/CallTypeFilter';
import OtherFilters from '../OtherFilters/OtherFilters';

import styles from './Dashboard.module.scss';
import SearchInput from '../SearchInput/SearchInput';

const otherFilters = [
    'Все сотрудники',
    'Все звонки',
    'Все источники',
    'Все оценки',
    'Все ошибки',
];

function Dashboard() {
    const { status } = useSelector((state) => state.calls);
    const { type } = useSelector((state) => state.filter);
    const date = useSelector((state) => state.filter.date);

    const calls = useSelector((state) => selectVisibleCall(state, type, date));
    const [inputValue, setInputValue] = useState('');

    return (
        <section className={styles.dashboard}>
            {/* баланс и дата */}
            <div className={styles.balanceAndDate}>
                <div className={styles.balance}>
                    <p>
                        Баланс: <span>272 ₽</span>
                    </p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM18 13.2H13.2V18H10.8V13.2H6V10.8H10.8V6H13.2V10.8H18V13.2Z"
                            fill="#005FF8"
                        />
                    </svg>
                </div>
                <Calendar />
            </div>
            {/* поиск и варианты сортировки */}
            <div className={styles.filtersAndSearch}>
                {/* <label
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
                </label> */}
                <SearchInput placeholder={'Поиск по звонкам'} />
                <div className={styles.filtersWrapper}>
                    <CallTypeFilter />
                    {otherFilters.map((item) => (
                        <OtherFilters key={item} filter={item} />
                    ))}
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
                {status === 'error' ? (
                    <h2>ПРоизошла ошибка</h2>
                ) : status === 'loading' ? (
                    <div className={styles.loader}></div>
                ) : (
                    calls.map((item) => <CallItem key={item.id} {...item} />)
                )}
            </div>
        </section>
    );
}

export default Dashboard;
