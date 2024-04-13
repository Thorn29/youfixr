'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { magic } from '../../../lib/magic-client';
import styles from './Login.module.css'

const Login: React.FC = () => {
  const [data, setData] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const checkEmail = (input: string) => {
    return input.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('')
    }
    setData(e.target.value)
  }

  const submitEmail = async() => {
    setLoading(true)
    const isValid = checkEmail(data)

    if (!isValid) {
      setLoading(false)
      return setError('Please enter a valid email address')
    }

    if (magic) {

      try {
        const didToken = await magic.auth.loginWithMagicLink({ email: data })

        if (didToken) {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${didToken}`,
              'Content-Type': 'application/json'
            }
          })
          const userData = await response.json()
          if (userData) {
            typeof window !== 'undefined' && sessionStorage.setItem('user', userData.data)
            router.push('/home')
          } else {
            setLoading(false)
            setError('Something went wrong')
          }
        }

      } catch (err) {
        setLoading(false)
        setError('Something went wrong')
      }
    }
    setLoading(false)
  }

  const useAsGuest = () => {
    router.push('/home')
  }

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} font2`}>Sign In</h1>
      <p className={`${styles.desc} font2`}>Enter your email and you will receive a link</p>
      <input onChange={inputChangeHandler} type='email' placeholder='Email' className={`${styles.input} font1`} value={data} />
      <p className={`${styles.error} font1`}>{error}</p>
      <button onClick={submitEmail} className={`${styles.button} font1`}>{loading ? 'Loading...' : 'Sign In'}</button>
      <button onClick={useAsGuest} className={`${styles.button} font1`}>Enter as guest</button>
    </div>
  );
};

export default Login;