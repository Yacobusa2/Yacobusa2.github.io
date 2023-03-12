import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import DiscordSection from '../components/home/DiscordSection';
import DonateSection from '../components/home/DonateSection';
import FitnessSection from '../components/home/FitnessSection';
import MerchSection from '../components/home/MerchSection';
import Socials from '../components/home/Socials';
import VideoSection from '../components/home/VideoSection';
// import ConstructionWarning from '../components/home/ConstructionWarning';
import Shill from '../components/Shill';

import { useRouter } from 'next/router';

import styles from '../styles/home/Home.module.css';

export default function Home() {
  // const [engaged, setEngaged] = useState(false);
  const [engaged, setEngaged] = useState(true);
  const router = useRouter()

  // Pin logo
  // Engage content
  useEffect(() => {
    setTimeout(() => setEngaged(true), 750);
  }, []);

  // Check for links subdomain redirect.
  useEffect(() => {
    const [subdomain] = window.location.hostname.split('.');
    if (subdomain === 'links')
      router.push('/links');
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('erudite-bg');
    return function cleanup() {
      document.documentElement.classList.remove('erudite-bg');
    }
  }, []);

  return (
    <>
      <Head>
        <title>NotSoErudite</title>
        <meta name="description" content="1 stop shop for Intellectual Thirst Traps" />
      </Head>

      <Header engaged={engaged} home={false} />

      <div className={styles.bio}>
        Hey guys! 
        {/* <p>
          I&apos;m working on trying to establish a nuanced and reasonable space to talk about topics that matter to us most. Gender, dating, relationships, mental health, education, and sociocultural norms. 
        </p> */}
        <p>
          I try my best to be researched and informed on the positions I share publicly. If you want to support my pursuit of knowledge and explore heavy topics with me, feel free.
        </p>

        <div>
          <a 
              href="https://streamelements.com/notsoerudite/tip"
              target="_blank"
              rel="noreferrer"
              className={[
                styles.cta
          ].join(' ')}>
              💚 Donate
          </a>
          {/* <Link href="/watch">
            <a className={styles.cta_secondary}>📺 Watch</a>
          </Link> */}
        </div>
      </div>

      {/* <MerchSection engaged={engaged} /> */}

      <DiscordSection />

      <FitnessSection />

      {/* <ConstructionWarning /> */}

      {/* <DonateSection /> */}


      <VideoSection />

      <Socials />

      <Shill />

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-QCPWC1QNCG"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-QCPWC1QNCG');
        `}
      </Script>
    </>
  )
}
