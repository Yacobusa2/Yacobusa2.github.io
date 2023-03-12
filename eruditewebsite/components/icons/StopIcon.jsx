export default function StopIcon({ extraClass = '', click }) {
    return <svg onClick={click} className={extraClass} viewBox="0 0 200 200">
        <rect width="200" height="200" rx="25" fill="black"/>
    </svg>
};