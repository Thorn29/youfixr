import React from 'react';
import styles from './Footer.module.css'

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <p className='font3'>© 2024 YouFixr | All rights reserved</p>
    </div>
  );
};

export default Footer;