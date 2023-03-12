import Link from 'next/link';

import styles from '../../styles/home/FitnessSection.module.css';

export default function FitnessSection() {
    return <>
        <div id="fitness" className={styles.fitness}>
            <h1 className="heading">
                {/* <span className={'collapseText'}>Elite&nbsp;</span> */}
                Meet The Coach 🏋️
            </h1>

            {/* <img src="/coaching-placeholder.jpg" className={styles['fitness-placeholder']} /> */}
            {/* <img src="/coaching-placeholder-2.png" className={styles['fitness-placeholder']} /> */}

            {/* <p>
                notsoErudites husband Nick is a master/god of all possible realities.
                If you need help in any of the following areas, see below for a free
                consultation.
            </p>
            
            <ul className={styles.list}>     
                <li>Set realistic goals </li>
                <li>Track your physical progress</li>
                <li>Improve your health and wellbeing</li>
                <li>Learn the correct technique for gym equipment</li>
                <li>Get a workout routine and schedule</li>
                <li>Discover extra motivation and confidence</li>
            </ul> */}
            
        </div>

        <div className={styles.actions}>
            <a 
                href="https://xev9tqakm26.typeform.com/to/LiZhhDMl" 
                rel='noopen noreferrer' target="_blank" 
                className={styles.primary}>
                    <span className={'collapseText'}>Free&nbsp;</span>
                    Consultation
            </a>
            <Link href="/fitness">
                <a className={styles.secondary}>
                    <span className={'collapseText'}>View&nbsp;</span>
                    Packages
                </a>
            </Link>
        </div>
    </>
};
