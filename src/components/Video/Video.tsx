'use client'
import React, { useState, useEffect, useContext} from 'react';
import styles from './Video.module.css'
import { useRouter } from 'next/navigation';
import { VideoContext, VideoContextType } from './VideoContext';

const Video: React.FC = () => {
  const { active, modalIsOpen, setModalIsOpen } = useContext(VideoContext) as VideoContextType
  const [saved, setSaved] = useState<boolean>(() => active?.favorited ? true : false);
  const [error, setError] = useState<string>('');
  const router = useRouter()
  const userLoggedIn = sessionStorage.getItem('user');


  useEffect(() => {
    if (!userLoggedIn || !modalIsOpen || active?.favorited) return;

      const getVideoStatus = async() => {
        if (userLoggedIn) {
        const resp = await fetch(`/api/videos/${active?.videoId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const favoritedValue = await resp.json();
        if (favoritedValue.active) {
          setSaved(true)
        }
      }
    }
 
      getVideoStatus();
  }, [])

  useEffect(() => {
    if (!userLoggedIn || !modalIsOpen || active?.favorited) return;
    const storeVideo = async() => {
      await fetch('/api/videos', {
        method: 'POST',
        body: JSON.stringify({
          videoId: active?.videoId,
          favorited: active?.favorited ?? false,
          title: active?.title,
          author: active?.author,
          date: active?.date,
          description: active?.description,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    storeVideo();  
  }, [modalIsOpen])

  const saveVideoHandler = async () => {
    if (!userLoggedIn) {
      return router.push('/');
    }

    setError('')
    try {
      await fetch('/api/videos', {
        method: 'POST',
        body: JSON.stringify({
          videoId: active?.videoId,
          favorited: !saved,
          title: active?.title,
          author: active?.author,
          date: active?.date,
          description: active?.description,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      setSaved(prev => !prev)    
    } catch (error) {
      setError('Something went wrong')
    }
  }

  if (!modalIsOpen) return;
  return (
  <>
    <div className={styles.backdrop} onClick={() => setModalIsOpen(false)}></div>
    <div className={styles.container}>
      <iframe width="100%" height="100%" className={styles.video} src={`https://www.youtube.com/embed/${active?.videoId}?controls=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      <div className={styles.overlay}></div>
      <div className={styles.videoData}>
        <div className={styles.buttons}>
          <button onClick={() => setModalIsOpen(false)} className={`${styles.button} font3`}>Close</button>
          <button onClick={saveVideoHandler} className={`${styles.button} ${saved && styles.active} font3`}>{saved ? 'Unsave' : 'Save'}</button>
          {error && <p className='error font2'>{error}</p>}
        </div>
        <div className={styles.info}>
          <div className={styles.small}>
            <span className='font2'>{active?.author}</span>
            <span className='font2'>{active?.date}</span>
          </div>
          <h1 className={`${styles.title} font1`}>{active?.title}</h1>
          <div className={styles.desc}>
            <p className={`${styles.text} font2`}>{active?.description}</p>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Video;