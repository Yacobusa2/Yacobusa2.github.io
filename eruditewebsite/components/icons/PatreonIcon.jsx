export default function PatreonIcon({ extraClass = '' }) {
    return <svg className={extraClass} viewBox="0 0 48 48">
        <defs>
            <filter id="shadow" x="0" y="0" width="200%" height="200%">
                <feOffset result="offOut" in="SourceGraphic" dx="1.5" dy="1.5" />
                <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                    values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1.25" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
        </defs>

        <g filter="url(#shadow)">
            <rect width="6" height="32" x="8" y="8" fill="#f44336" />
            <circle cx="30" cy="20" r="12" fill="#f44336" />
        </g>
    </svg>
};