import React from 'react';
import { getVideos } from '../../../../lib/videos';
import Header from '@/components/Header/Header';
import Grid from '@/components/Grid/Grid';
import MainWrapper from '@/components/Footer/MainWrapper';
import VideoContextWrapper from '@/components/Video/VideoContextWrapper';
import Video from '@/components/Video/Video';

export async function generateMetadata({ params }: { params: { catg: string } }) {
  const categoryName = params.catg.charAt(0).toUpperCase() + params.catg.slice(1)
  return {
    title: `${categoryName} | YouFixr`,
  }
}

const CategoryPage = async ({ params } : { params: { catg: string } }) => {

  const videos = await getVideos(`${params.catg} tutorial`, 27)
  return (
    <VideoContextWrapper>
      <Header />
      <MainWrapper>
        <h1 className='page-title font2'>{params.catg}</h1>
        <Grid data={videos.items} />
        <Video />
      </MainWrapper>
    </VideoContextWrapper>
  );
};

export default CategoryPage;