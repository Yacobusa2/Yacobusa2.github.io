import TwitchIcon from '../icons/TwitchIcon';
import YoutubeIcon from '../icons/YoutubeIcon';

import styles from '../../styles/home/VideoSection.module.css';
import { useEffect } from 'react';

export default function VideoSection() {
    useEffect(() => {
        setTimeout(() => {
            const iframe = document.querySelector('iframe');
            if (iframe)
                iframe.src = iframe.dataset.src
        }, 2250);
    }, []);

    return <div className={styles.videos}>
        {/* TODO: Check if streaming, if not - hide section */}
        <h1 className={"heading"}>Watch now 📺</h1>

        <div className={styles.ctas}>
            <a 
                href="https://www.twitch.tv/notsoerudite" 
                target="_blank" rel="noreferrer"
                className={styles['cta']}>
                <TwitchIcon extraClass={styles.icon} />
                <span style={{ color: '#7e57c2' }} className={styles['cta-text']}>Watch Twitch</span>
            </a>

            <a 
                href="https://www.youtube.com/channel/UCyfYnJbsQ20Ee0y_jqDq09A" 
                target="_blank" rel="noreferrer"
                className={styles['cta']}>
                <YoutubeIcon extraClass={styles.icon} />
                <span style={{ color: '#ff3d00' }} className={styles['cta-text']}>Watch YouTube</span>
            </a>
        </div>

        <iframe
            className={styles['embed']}
            data-src="https://player.twitch.tv/?channel=notsoerudite&parent=notsoerudite.com&parent=www.notsoerudite.com"
            height="100%"
            title="notsoErudite Twitch stream"
            width="100%"
            frameBorder="0"
            loading="lazy"
            allowFullScreen>
        </iframe>
    </div>
};
