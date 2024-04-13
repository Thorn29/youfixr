'use client'
import React, { useState, useEffect } from 'react';
import NavLink from '../NavLink/NavLink';
import styles from './Nav.module.css'
import AuthButton from '../AuthButton/AuthButton';

const Nav: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>('')
  const [userIsLoading, setUserIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const email = sessionStorage.getItem('user');
    if (email) {
      setUserEmail(email)
    }
    setUserIsLoading(false)
  }, [])

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}></div>
      <ul className={styles.list}>
        <NavLink href='/home'>Home</NavLink>
        <NavLink href='/categories'>Categories</NavLink>
        {userEmail && <NavLink href='/favorites'>Favorites</NavLink>}
      </ul>
      <AuthButton email={userEmail} loading={userIsLoading} />
    </nav>
  );
};

export default Nav;