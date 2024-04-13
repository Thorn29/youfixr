'use client'
import React, { useContext } from 'react';
import GridTile from './GridTile/GridTile';
import styles from './Grid.module.css'
import { RawVideo, VideoData } from '@/types/videos';
import { VideoContext, VideoContextType } from '../Video/VideoContext';

const Grid: React.FC<{ data: RawVideo[] }> = ({ data }) => {

  const { openTile } = useContext(VideoContext) as VideoContextType

  const formatData = (item:RawVideo) => {
    const date = item.snippet.publishedAt.split('T').shift()?.split('-').reverse().join('/') as string;
    const videoData: VideoData = {
      videoId: item.id.videoId,
      title: item.snippet.title.replaceAll('&amp;', '&'),
      author: item.snippet.channelTitle,
      date: date,
      description: item.snippet.description
    };

    return videoData;
  }

  return (
    <>
      <div className={styles.grid}>
        {data.map((item: RawVideo) => {
          const dataClean = formatData(item)
          return <GridTile key={item.id.videoId} tile={dataClean} onClick={() => openTile(dataClean)} />
        })}
      </div>
    </>
  );
};

export default Grid;