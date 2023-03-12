export default function ListenIcon({ extraClass = '', click }) {
    return <svg onClick={click} className={extraClass} viewBox="0 0 274 274">
        <circle cx="137" cy="137" r="126" fill="none" strokeWidth="22" />
        <circle cx="137" cy="137" r="54" stroke="none" />
    </svg>
};