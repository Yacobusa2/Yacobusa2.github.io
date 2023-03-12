import Link from 'next/link';
import Logo from './Logo';

import styles from '../styles/Header.module.css';
import { useEffect } from 'react';

export default function Header({ engaged, links = true, home = false }) {

    useEffect(() => {
        const logo = document.querySelector('.' + styles.logo);
        const scrollListener = (ev) => logo.classList.add(styles['logo-pinned']);
    });

    return <>
        <Logo 
            extraFillClass={styles['logo-fill']}
            extraStrokeClass={styles['logo-stroke']}
            extraClass={[
                styles.logo,
                engaged ? styles['logo-pinned'] : ''
            ].join(' ')} 
        />

        <div className={[
            styles['actions'],
            engaged ? styles['actions-shown'] : ''
            ].join(' ')}>

            { home ?
                <Link href="/">
                    <a className={styles['action-item']}>🏠 Home</a>
                </Link>
                :
                null
            }

            <Link href="/fitness">
                <a className={styles['action-item']}>🏋️ Fitness</a>
            </Link>

            { links ?
                <a 
                    href="https://streamelements.com/notsoerudite/tip"
                    target="_blank"
                    rel="noreferrer"
                    className={[
                    styles['action-item'],
                    styles['action-item-main']
                ].join(' ')}>
                    💚 Donate
                </a>
                :
                null
            }

            {/* Watch now */}
        </div>
    </>
};

