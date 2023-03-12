import DreamsbyteIcon from "./icons/DreamsbyteIcon";
import styles from "../styles/Shill.module.css";

// export default function Shill({ art = true }) {
export default function Shill({ art = true }) {
    return <div className={styles['shill-wrapper']}>
        {/* { 
            art ?
                <a className={styles['shill']} href="https://www.deviantart.com/bisbiswas" target="_blank" rel="noopener noreferrer">
                    Art by bisbiswas
                </a>
                :
                null
        } */}
        <a className={styles['shill']} href="https://www.deviantart.com/bisbiswas" target="_blank" rel="noopener noreferrer">
            Art by bisbiswas
        </a>
        <a className={styles['shill']} href="https://dreamsbyte.com" target="_blank" rel="noopener noreferrer">
            Website by 
            <DreamsbyteIcon />
        </a>
    </div>
};

