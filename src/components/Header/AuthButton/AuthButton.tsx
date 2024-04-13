'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { magic } from '../../../../lib/magic-client';
import styles from './AuthButton.module.css'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const AuthButton: React.FC<{ email?: string; loading?: boolean }> = ({ email, loading }) => {

  const [dropdownIsVisible, setDropdownIsVisible] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const router: AppRouterInstance = useRouter()

  const toggleDropdown = () => {
    setDropdownIsVisible(prev => !prev)
  }

  const logInHandler = () => {
    router.push('/')
  }

  const logOutHandler = async() => {
    setError('');
    try {
      sessionStorage.removeItem('user');
      magic && magic.user.logout()
      const cookieRes = await fetch('/api/logout');
      const cookieRemoved = await cookieRes.json()
      if (cookieRemoved.success) {
        router.push('/')
      } else {
        setError('Something went wrong')
      }
    } catch (err) {
      setError('Something went wrong')
    }
  }


  const loggedInContent: React.JSX.Element = (
    <div className={styles.userInfo}>
      <div className={styles.info} onClick={toggleDropdown}>
        <p className={`${styles.text} font1`}>{email}</p>
        {error && <p className={`error font2`}>Something went wrong{error}</p>}
      </div>
      {dropdownIsVisible && <div className={styles.dropdown}>
        <button onClick={logOutHandler} className={`${styles.button} font1`} >Log out</button>
      </div>}
    </div>
  )

  const content: React.JSX.Element = (email ? loggedInContent : <button onClick={logInHandler} className={`${styles.button} font1`} >Log in</button>);

  if (loading) return <button className={`${styles.button} font1`}>Loading...</button>;
  return (
    <div className={styles.authButton}>
      {content}
    </div>
  );
};

export default AuthButton;