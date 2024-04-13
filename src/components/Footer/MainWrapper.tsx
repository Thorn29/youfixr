import React from 'react';
import Footer from './Footer';
import styles from './MainWrapper.module.css';

const MainWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainWrapper;