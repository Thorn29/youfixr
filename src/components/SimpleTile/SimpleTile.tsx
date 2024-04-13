  import React from 'react';
  import Image from 'next/image';
  import styles from './SimpleTile.module.css'
  
  const SimpleTile: React.FC<{ title: string, videoId: string, onClick: () => void }> = ({ title, videoId, onClick }) => {
    return (
      <div className={styles.simpleTile} onClick={onClick}>
        <div className={styles.imgWrapper}>
          <Image src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt={title} fill sizes='90vw, 400px' style={{ objectFit: 'cover' }} />
        </div>
        <h1 className={`${styles.title} font3`}>{title}</h1>
      </div>
    );
  };
  
  export default SimpleTile;