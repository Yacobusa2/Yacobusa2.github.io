import styles from '../../styles/fitness/Packages.module.css';

export default function Packages({ engaged }) {
    return <div id="packages" className={[styles['packages-wrapper']].join(' ')}>
        <h1 className={styles['extra-title']}>Packages</h1>
        
        <div className={styles.packages}>
            <div className={styles.package}>
                <h2 className={styles['package-title']}>Personalised</h2>
                <div className={styles.breakdown}>
                    <span className={styles['package-breakdown-item']}>- Consultation.</span>
                    <span className={styles['package-breakdown-item']}>- Customised fitness program.</span>
                </div>
                <a 
                    href="https://buy.stripe.com/eVa8y78xA6rY7f2aEM"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles['package-select']}>
                    $100 once
                </a>
            </div>

            <div className={styles.package}>
                <h2 className={styles['package-title']}>Accountability</h2>
                <div className={styles.breakdown}>
                    <span className={styles['package-breakdown-item']}>- Pragmatic suggestions.</span>
                    <span className={styles['package-breakdown-item']}>- Exercise form help.</span>
                    <span className={styles['package-breakdown-item']}>- Some reminder/accountability messages.</span>
                </div>
                <a 
                    href="https://buy.stripe.com/28o3dNeVYg2y2YM3cl"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles['package-select']}>
                    $50 monthly
                </a>
            </div>
        </div>

        <h1 className={styles['extra-title']}>Programs</h1>

        <div className={styles.programs}>
            <div className={styles.program}>
                <h2 className={styles['package-title']}>Tier 1 (Hands-Off)</h2>
                <div className={styles.breakdown}>
                    <span className={styles['package-breakdown-item']}>- Customised fitness program.</span>
                    <span className={styles['package-breakdown-item']}>- 24/7 text-based/message support.</span>
                </div>
                <a 
                    href="https://buy.stripe.com/4gwbKj9BE17Ebvi4gn"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles['package-select']}>
                    $125 monthly
                </a>
            </div>

            <div className={styles.program}>
                <h2 className={styles['package-title']}>Tier 2 (Education)</h2>
                <div className={styles.breakdown}>
                    <span className={styles['package-breakdown-item']}>- Customised fitness program.</span>
                    <span className={styles['package-breakdown-item']}>- 4 x 15-minute scheduled check-ins.</span>
                    <span className={styles['package-breakdown-item']}>- 24/7 text-based/message support.</span>
                </div>
                <a 
                    href="https://buy.stripe.com/14k15F4hk17EeHu006"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles['package-select']}>
                    $250 monthly
                </a>
            </div>

            <div className={styles.program}>
                <h2 className={styles['package-title']}>Tier 3 (Dedication)</h2>
                <div className={styles.breakdown}>
                    <span className={styles['package-breakdown-item']}>- Customised fitness program.</span>
                    <span className={styles['package-breakdown-item']}>- More accountability check-ins.</span>
                    <span className={styles['package-breakdown-item']}>- 24/7 contact availability.</span>
                </div>
                <a 
                    href="https://buy.stripe.com/cN23dN29c8A61UI7sx"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles['package-select']}>
                        $400 monthly
                </a>
            </div>
        </div>
    </div>
};
