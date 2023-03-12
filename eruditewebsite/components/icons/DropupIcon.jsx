export default function DropupIcon({ extraClass = '', click }) {
    return <svg onClick={click} className={extraClass} viewBox="0 0 18 10">
        <path d="M15 10L8.75 3.75L2.5 10L1.09278e-07 8.75L8.75 -7.64949e-07L17.5 8.75L15 10Z" />
    </svg>
};