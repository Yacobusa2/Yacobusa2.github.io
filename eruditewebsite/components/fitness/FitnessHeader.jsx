import Link from 'next/link';
import FitnessLogo from '../FitnessLogo';

import headerStyles from '../../styles/Header.module.css';
import styles from '../../styles/fitness/FitnessHeader.module.css';

export default function FitnessHeader({ engaged }) {

    return <>
        <FitnessLogo 
            extraFillClass={headerStyles['logo-fill']}
            extraStrokeClass={headerStyles['logo-stroke']}
            extraClass={[
                headerStyles.logo,
                headerStyles['logo-pinned']
                // engaged ? headerStyles['logo-pinned'] : ''
            ].join(' ')} 
        />

        <div className={[
            headerStyles['actions'],
            engaged ? headerStyles['actions-shown'] : ''
        ].join(' ')}>
            <Link href="/">
                <a className={headerStyles['action-item']}>🏠 Home</a>
            </Link>

            <a 
                target="_blank" rel="noreferrer" 
                href="https://xev9tqakm26.typeform.com/to/LiZhhDMl" 
                className={[
                    headerStyles['action-item'], 
                    headerStyles['action-item-main']
                ].join(' ')}>
                    📖 Book
            </a>
        </div>
    </>
};

