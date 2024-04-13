import React from 'react';
import Image from 'next/image';
import styles from './GridTile.module.css'
import { RawVideo, VideoData } from '@/types/videos';

const GridTile: React.FC<{ tile: VideoData; onClick: () => void }> = ({ tile, onClick }) => {
  return (
    <div className={styles.gridTile} onClick={onClick}>
        <div className={styles.imgWrapper}>
          <Image src={`https://i.ytimg.com/vi/${tile.videoId}/hqdefault.jpg`} alt={tile.title} fill sizes='(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw' style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.desc}>
          <h1 className={`${styles.videoTitle} font3`}>{tile.title.replaceAll('&amp;', '&')}</h1>
          <div className={styles.videoSubtext}>
            <p className={`${styles.videoAuthor} font3`}>{tile.author}</p>
            <p className={`${styles.videoDate} font3`}>{tile.date}</p>
          </div> 
        </div>
    </div>
  );
};

export default GridTile;