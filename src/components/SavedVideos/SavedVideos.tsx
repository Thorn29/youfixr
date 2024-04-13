'use client'
import React, { useState, useEffect, useContext } from 'react';
import SimpleTile from '../SimpleTile/SimpleTile';
import styles from './SavedVideos.module.css'
import { VideoData } from '@/types/videos';
import { VideoContext, VideoContextType } from '../Video/VideoContext';

const SavedVideos: React.FC = () => {
  const [list, setList] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const { openTile } = useContext(VideoContext) as VideoContextType

  useEffect(() => {
    const getVideoStatus = async() => {
      const resp = await fetch('/api/favorites', {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await resp.json();
      if (data?.list?.length > 0) {
        setList(data.list)
      }

      setLoading(false)
    }

    getVideoStatus()
  }, [])

  if (loading) return <h4 className={`${styles.message} ${styles.loading} font2`}>Loading...</h4>
  if (list.length === 0) return <h4 className={`${styles.message} font2`}>You haven't saved any videos yet</h4>
  return (
    <>
      <div className={styles.savedVideos}>
        {list.map((item: VideoData) => <SimpleTile key={item.videoId} title={item.title} videoId={item.videoId} onClick={() => openTile(item)} />)}
      </div>
    </>
  );
};

export default SavedVideos;