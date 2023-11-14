import React from 'react';
//styles
import styles from './layout.module.css';

const Layout = ({children}) => {
    return (
        <div>
            <header className={styles.header}>
                <h1>Crypto App</h1>
                <p>React.js full course</p>
            </header>
                {children}
            <footer>
                <p>Made by Elahe With 💗</p>
            </footer>
        </div>
    );
};

export default Layout;