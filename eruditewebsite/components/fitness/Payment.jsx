import Image from 'next/image';
import packagesStyles from '../../styles/fitness/Packages.module.css';
import styles from '../../styles/fitness/Payment.module.css';

export default function Payment() {

    // TODO: Set amount via URL
    // TODO: Format it into the Stripe URL

    return <div className={[styles['payment-wrapper']].join(' ')}>

        <div className={styles['payment-text']}>
            <h1 className={styles['extra-title']}>Payment</h1>

            <p>Securely pay via Stripe</p>

            <a 
                href="https://buy.stripe.com/9AQg0z1585nUdDq00b"
                target="_blank" 
                rel="noopener noreferrer"
                className={packagesStyles['package-select']}>
                Confirm
            </a>
        </div>

        <Image className={styles.qr} src="/qr-custom-pay.png" />
    </div>
};
