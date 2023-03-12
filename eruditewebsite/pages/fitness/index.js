import Head from 'next/head';
import { useEffect, useState } from 'react';

import Socials from '../../components/home/Socials';
import Faqs from '../../components/fitness/Faqs';
import Packages from '../../components/fitness/Packages';
import FitnessHeader from '../../components/fitness/FitnessHeader';
import FitnessSocials from '../../components/fitness/FitnessSocials';
import Shill from '../../components/Shill';
import Script from 'next/script';
import CustomPayment from '../../components/fitness/CustomPayment';

export default function Fitness() {
  const [engaged, setEngaged] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('fitness-bg');
    return function cleanup() {
      document.documentElement.classList.remove('fitness-bg');
    }
  }, []);

  // Pin logo
  // Engage content
  useEffect(() => {
    setTimeout(() => {
      // scrollTo is a patch that isn't required on home page but here oddly, probably due to child.
      window.scrollTo(0, 0);
      setEngaged(true);
    }, 750);
  }, []);

  return (
    <>
      <Head>
        <title>NotSo | Fitness</title>
        <meta name="description" content="1 stop shop for Intellectual Thirst Traps" />
      </Head>

      <FitnessHeader engaged={engaged} />

      <CustomPayment />

      <Packages />

      <Faqs />

      <FitnessSocials />

      <Shill art={false} />

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
