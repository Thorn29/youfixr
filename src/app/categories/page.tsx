import React from 'react';
import { Metadata } from 'next';
import Category from '@/components/Category/Category';
import Header from '@/components/Header/Header';
import styles from './page.module.css'
import MainWrapper from '@/components/Footer/MainWrapper';
import VideoContextWrapper from '@/components/Video/VideoContextWrapper';
import Video from '@/components/Video/Video';

export const metadata: Metadata = {
  title: "Categories | YouFixr",
};

const CategoriesPage = () => {
  return (
    <VideoContextWrapper>
      <Header />
      <MainWrapper>
        <h1 className='page-title font2'>Categories</h1>
        <div className={styles.categoryGrid}>
          <Category title='Construction' />
          <Category title='Automechanics' />
          <Category title='Woodworking' />
          <Category title='Plumbing' />
          <Category title='Electrical' />
          <Category title='Interior' />
          <Category title='Gardening' />
          <Category title='HVAC' />
          <Category title='Tiling' />
        </div>
        <Video />
      </MainWrapper>
    </VideoContextWrapper>
  );
};

export default CategoriesPage;