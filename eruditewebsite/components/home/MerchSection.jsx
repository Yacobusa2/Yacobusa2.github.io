import styles from '../../styles/home/MerchSection.module.css';

export default function MerchSection({ engaged }) {
    return <div id="merch" className={[styles.merch, engaged ? styles.engaged : ''].join(' ')}>
        <h1 className={["heading", styles.title].join(' ')}>
            Merch 🛍️
        </h1>

        {/* <p>Merchandise and more coming soon! Thanks Tink.</p> */}

        {/* <img src="/merch-placeholder.png" className={styles['merch-placeholder']} /> */}
    </div>
};
