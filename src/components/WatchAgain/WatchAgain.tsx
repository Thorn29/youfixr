'use client'
import React, { useState, useEffect, useContext } from 'react';
import styles from './WatchAgain.module.css'
import SimpleTile from '../SimpleTile/SimpleTile';
import { VideoData } from '@/types/videos';
import { VideoContext, VideoContextType } from '../Video/VideoContext';

const WatchAgain: React.FC = () => {
  const { openTile } = useContext(VideoContext) as VideoContextType
  const [list, setList] = useState<VideoData[]>([])

  useEffect(() => {
    const getVideos = async() => {
      const resp = await fetch('/api/videos', {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const videoList: { data: VideoData[] } = await resp.json();
      if (videoList.data && videoList.data.length) {
        setList(videoList.data)
      }
    }

    getVideos()
  }, [])

  if (list.length < 3) return;
  return (
    <>
      <div className={styles.watchAgain}>
        <h1 className={`page-title font2 ${styles.title}`}>Watch it again</h1>
        <div className={styles.container}>
          {list.map((item: VideoData) => <SimpleTile key={item.videoId} title={item.title} videoId={item.videoId} onClick={() => openTile(item)} />)}
        </div>
      </div>
    </>
  );
};

export default WatchAgain;