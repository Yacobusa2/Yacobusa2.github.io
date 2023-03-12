export default function DropdownIcon({ extraClass = '', click }) {
    return <svg onClick={click} className={extraClass} viewBox="0 0 18 10">
        <defs>
            <linearGradient id="gradient">
                <stop stopColor="#7869D9" offset="0%" />
                <stop stopColor="#EE6C4D" offset="100%" />
            </linearGradient>
        </defs>
        <path 
            strokeWidth="1"
            d="M2.5 0L8.75 6.25L15 0L17.5 1.25L8.75 10L0 1.25L2.5 0Z" 
        />
    </svg>
}

