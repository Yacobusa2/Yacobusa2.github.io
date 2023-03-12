import InstagramIcon from '../icons/InstagramIcon';
import TwitchIcon from '../icons/TwitchIcon';
import TwitterIcon from '../icons/TwitterIcon';
import YoutubeIcon from '../icons/YoutubeIcon';
import PatreonIcon from '../icons/PatreonIcon';
import DiscordIcon from '../icons/DiscordIcon';

import styles from '../../styles/home/Socials.module.css';

export default function FitnessSocials() {
    return <div className={styles.socials}>
        <a 
            href="https://discord.com/invite/notsoerudite" 
            target="_blank" rel="noreferrer"
            aria-label="Discord social media link"
            className={styles['socials-icon-link']}>
                <DiscordIcon extraClass={styles['socials-icon']} />
        </a>
        <a 
            href="https://www.instagram.com/not_so_erudite/" 
            target="_blank" rel="noreferrer"
            aria-label="Instagram social media link"
            className={styles['socials-icon-link']}>
                <InstagramIcon extraClass={styles['socials-icon']} />
        </a>
        <a 
            href="https://www.patreon.com/notsoErudite" 
            target="_blank" rel="noreferrer"
            aria-label="Patreon social media link"
            className={styles['socials-icon-link']}>
                <PatreonIcon extraClass={styles['socials-icon']} />
        </a>
    </div>
};
