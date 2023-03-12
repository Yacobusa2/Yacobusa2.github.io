import Head from 'next/head';
import { useEffect, useState } from 'react';

import Socials from '../../components/home/Socials';

import Payment from '../../components/fitness/Payment';
import FitnessHeader from '../../components/fitness/FitnessHeader';
import FitnessSocials from '../../components/fitness/FitnessSocials';
import Shill from '../../components/Shill';

export default function Fitness() {
  const [engaged, setEngaged] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('fitness-bg');
    return function cleanup() {
      document.documentElement.classList.remove('fitness-bg');
    }
  }, []);

  return (
    <>
      <Head>
        <title>NotSo | Fitness</title>
        <meta name="description" content="1 stop shop for Intellectual Thirst Traps" />
      </Head>

      <FitnessHeader engaged={engaged} />

      <Payment />

      <FitnessSocials />

      <Shill art={false} />
    </>
  )
}
