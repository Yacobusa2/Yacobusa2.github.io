import DiscordIcon from '../icons/DiscordIcon';
import styles from '../../styles/home/DiscordSection.module.css';

export default function DiscordSection() {
    return <div className={styles.discord}>
        <h1 className={"heading"}>Join Discord 📢</h1>

        <p>
            Join the best and most active parasociality Discord server of Youtube/Twitch.
        </p>

        <a className={styles.link} href="https://discord.gg/notsoerudite">
            <DiscordIcon extraClass={styles.icon} />
            JOIN SERVER
        </a>
    </div>
};
