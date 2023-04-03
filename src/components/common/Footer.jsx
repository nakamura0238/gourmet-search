import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.credit_box}>
        <p>ホットペッパー グルメサーチAPI</p>
        <span style={{
          display: 'inline-block',
          margin: '15px'}}>
        Powered by <a
            href="http://webservice.recruit.co.jp/"
            style={{color: '#1a75ff'}}>
            ホットペッパー Webサービス
          </a>
        </span>
      </div>

      <div className={styles.credit_box}>
        <p>Yahoo!リバースジオコーダAPI</p>
        <span style={{display: 'inline-block', margin: '15px'}}>
          <a
            href="https://developer.yahoo.co.jp/sitemap/"
            style={{color: '#1a75ff'}}>
            Webサービス by Yahoo! JAPAN
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
