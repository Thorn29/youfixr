import React from 'react';
import { Metadata } from 'next';
import Login from '@/components/Login/Login';
import styles from './page.module.css'
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "YouFixr"
};

const LogIn = () => {
  const user: string | false | null = typeof window !== 'undefined' && sessionStorage.getItem('user');

  if (user) return redirect('/home');
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}></div>
      </header>
      <div className={styles.content}>
        <Login />
      </div>
    </div>
  );
};

export default LogIn;