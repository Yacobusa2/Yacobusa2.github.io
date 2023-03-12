import DropdownIcon from '../../components/icons/DropdownIcon';

import styles from '../../styles/fitness/Faqs.module.css';

const faqs = [
    { label: "Question text placeholder here..." },
    { label: "Question text placeholder here..." },
    { label: "Question text placeholder here..." },
    { label: "Question text placeholder here..." },
];

const toggle = ({ target }) => {
    const item = target.closest('.' + styles['item']);
    item.classList.toggle(styles['open']);

    setTimeout(() => item.scrollIntoView(), 0);
}

export default function Faqs({ engaged }) {
    return <div className={[styles['faqs'], engaged ? styles.engaged : null].join(' ')}>
        <h1 className="heading">Frequent Questions</h1>

        <p>
            I have tried to answer any icons questions you are likely to have below, out of respect for your time. 
            If you&apos;d like to discuss options before confirming, book a free consultation _here_.
        </p>
        
        <div className={styles['list']}>
            { faqs.map((f, fI) => 
                <div key={fI} className={styles['item']}>
                    <div
                        onClick={toggle} 
                        className={styles['item-header']}>
                        <h3
                            className={styles['item-title']}>
                            { f.label }
                        </h3>
                        <DropdownIcon extraClass={styles['collapse-icon']} />
                    </div>
                    <div className={styles['item-content']}>
                        I have tried to answer any icons questions you are likely to have below, out of respect for your time. If you&apos;d like to discuss options before confirming, book a free consultation _here_.
                    </div>
                </div>
            )}
        </div>
    </div>
};
