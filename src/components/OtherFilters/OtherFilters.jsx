
import styles from './OtherFilters.module.scss'
function OtherFilters({ filter }) {
    return (
        <div className={styles.otherFilters}>
            <p>{filter}</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M7.41 8.59009L12 13.1701L16.59 8.59009L18 10.0001L12 16.0001L6 10.0001L7.41 8.59009Z"
                    fill="#ADBFDF"
                />
            </svg>
        </div>
    );
}

export default OtherFilters;