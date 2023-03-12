import styles from '../../styles/fitness/Packages.module.css';

export default function CustomPayment({ engaged }) {
    return <div id="custom-payment" className={[styles['packages-wrapper']].join(' ')}>
        <h1 className={styles['extra-title']}>Custom Payment / Donation</h1>
        <div className={styles.package}>
            {/* <h2 className={styles['package-title']}>Personalised</h2> */}
            <p className={styles['package-breakdown-item']}>Securely pay via Stripe.</p>
            <a 
                href="https://buy.stripe.com/9AQg0z1585nUdDq00b"
                target="_blank" 
                rel="noopener noreferrer"
                className={styles['package-select']}>
                Payment
            </a>
        </div>
    </div>
};
