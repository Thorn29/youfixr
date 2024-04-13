import React from 'react';
import Nav from './Nav/Nav';
import Banner from './Banner/Banner';
import styles from './Header.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Nav />
      <Banner />
    </header>
  );
};

export default Header;