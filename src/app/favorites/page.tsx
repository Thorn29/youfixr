import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header/Header';
import MainWrapper from '@/components/Footer/MainWrapper';
import SavedVideos from '@/components/SavedVideos/SavedVideos';
import { authenticateUser } from '../api/utils';
import { redirect } from 'next/navigation';
import Video from '@/components/Video/Video';
import VideoContextWrapper from '@/components/Video/VideoContextWrapper';

export const metadata: Metadata = {
  title: "Favorites | YouFixr",
};

const FavoritesPage = () => {
  const userData = authenticateUser();

  if (!userData) {
    redirect('/home')
  }

  return (
    <VideoContextWrapper>
      <Header />
      <MainWrapper>
        <h1 className='page-title font2'>Favorites</h1>
        <SavedVideos />
        <Video />
      </MainWrapper>
    </VideoContextWrapper>
  );
};

export default FavoritesPage;