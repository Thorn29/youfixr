'use client'
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import featured from '../../../../lib/banner-mock.json';
import styles from './Banner.module.css';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { VideoContext, VideoContextType } from '@/components/Video/VideoContext';

const Banner: React.FC = () => {
  const [count, setCount] = useState<number>(0)
  const { openTile } = useContext(VideoContext) as VideoContextType

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= featured.items.length - 1) {
          return 0
        } else return prev + 1
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [count]);

  const router: AppRouterInstance = useRouter();

  return (
    <>
    <div className={styles.banner}>
      <div className={styles.item}>
        <div className={styles.imgWrapper}>
          <Image src={`https://i.ytimg.com/vi/${featured.items[count].videoId}/hqdefault.jpg`} alt={featured.items[count].title} fill sizes='(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 400px' style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.info}>
          <h1 className={`${styles.title} font2`}>{featured.items[count].title}</h1>
          <h5 className={`${styles.subtitle} font3`}>{featured.items[count].date}</h5>
          <h6 className={`${styles.author} font3`}>{featured.items[count].author}</h6>
          <p className={`${styles.desc} font2`}>{featured.items[count].description}</p>
          <div className={styles.buttons}>
            <button onClick={() => router.push(`/category/${featured.items[count].category.toLowerCase()}`)} className={`${styles.button} font1`}>{featured.items[count].category}</button>
            <button onClick={() => openTile(featured.items[count])} className={`${styles.button} font1`}>Watch</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Banner;