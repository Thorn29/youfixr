import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Category.module.css'

const Category: React.FC<{ title: string }> = async({ title }) => {
  return (
    <Link href={`/category/${title.toLowerCase()}`} >
      <div className={styles.category}>
        <div className={styles.categoryBg}>
          <Image src={`/static/${title.toLowerCase()}.jpg`} alt={title} fill sizes='90vw, 400px' style={{ objectFit: 'cover' }} />
        </div>
        <h1 className={`${styles.categoryTitle} font2`}>{title}</h1>
      </div>
    </Link>
  );
};

export default Category;