import { useState } from 'react';
import logo from '../../assets/img/navigation/logo.svg';
import addOrderbtn from '../../assets/img/navigation/addOrderbtn.svg';
import paymentBtn from '../../assets/img/navigation/paymentBtn.svg';
import { data } from './mock';
import styles from './Navigation.module.scss';
function Navigation() {
    const [activeItem, setActiveItem] = useState(3);

    return (
        <nav className={styles.navigation}>
            <div className={styles.navigation__logo}>
                <img src={logo} alt="logo" />
            </div>
            <ul>
                {data.map(({ title, image }, index) => (
                    <li
                        onClick={() => setActiveItem(index)}
                        key={title}
                        className={index === activeItem ? styles.active : null}
                    >
                        <img src={image} alt="icon" />
                        <p>{title}</p>
                    </li>
                ))}
            </ul>
            <div className={styles.navigation__btnWrapper}>
                <button>
                    <p>Добавить заказ</p>
                    <img src={addOrderbtn} alt="oeder btn" />
                </button>
                <button>
                    <p>Оплата</p>
                    <img src={paymentBtn} alt="payment btn" />
                </button>
            </div>
        </nav>
    );
}

export default Navigation;
