import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { onEngineLoad } from '../../lib/engine';

import styles from '../../styles/misc/Erufighter.module.css';

// TODO: 
// Add mobile movement controls
// Add mobile action buttons
// https://www.gameuidatabase.com/index.php?&sort=1&tag=60&scrn=147
// https://stackoverflow.com/questions/12959237/get-point-coordinates-based-on-direction-and-distance-vector

export default function Erufighter() {
  const [movement, setMovement] = useState({ x: 0, y: 0 });

  

  useEffect(() => {
    document.documentElement.classList.add(styles.gamefull);
    document.body.classList.add(styles.gamefull);
    document.querySelector('#__next').classList.add(styles.gamefull);
    return function cleanup() {
      document.documentElement.classList.remove(styles.gamefull);
      document.body.classList.remove(styles.gamefull);
      document.querySelector('#__next').classList.remove(styles.gamefull);
    }
  }, []);

  // Update the property through the event listener.
  // useEffect(() => {}, [movement]);

  return (
    <>
      <Head>
        <title>NotsoPeaceful: Erufighter</title>
        <meta name="description" content="Community themed mobile fighting game" />
        <meta name="viewport" content="initial-scale=1" />

      </Head>

      <Script 
        src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js" 
        onLoad={() => onEngineLoad(movement, setMovement)}
      />

      <canvas id="game" className={styles.canvas} />

      <div className={styles.movement} id="movement">
        <img 
          style={{
            left: `${movement.x}px`,
            top: `${movement.y}px`,
          }}
          id="stick"
          src="/mobile-stick.svg" 
          className={styles.stick} 
          draggable="false" 
        />
      </div>
    </>
  )
}
