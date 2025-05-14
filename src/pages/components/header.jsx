import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-gray-900 shadow-md">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex h-24 items-center justify-center">
                    <Link href="/" className="text-white hover:text-gray-200 transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 414 520"
                            preserveAspectRatio="xMidYMid meet"
                            className="fill-current w-20 h-24"
                        >
                            <g transform="translate(0,520) scale(0.1,-0.1)" stroke="none">
                                <path d="M710 3750 l0 -1071 474 3 c464 3 475 3 503 24 15 11 38 36 51 54 22 33 22 35 22 427 0 368 -1 396 -19 431 -24 46 -57 76 -144 132 -37 23 -65 45 -62 49 3 3 43 31 88 61 133 89 128 71 125 502 -3 345 -4 358 -24 385 -12 15 -36 37 -55 48 -32 19 -55 20 -496 23 l-463 3 0 -1071z m730 542 l0 -259 -82 -57 -83 -56 -122 0 -123 0 0 308 c0 170 3 312 7 315 3 4 96 7 205 7 l198 0 0 -258z m-75 -682 l75 -51 0 -304 0 -305 -205 0 -205 0 0 355 0 355 130 0 131 0 74 -50z"/>
                                <path d="M1990 3750 l0 -1070 420 0 420 0 0 140 0 140 -260 0 -260 0 0 930 0 930 -160 0 -160 0 0 -1070z"/>
                                <path d="M1260 1570 l0 -1070 160 0 160 0 0 93 c0 50 0 469 0 930 l0 837 205 0 205 0 0 -335 0 -334 -157 -3 -158 -3 -3 -91 c-3 -91 -2 -92 71 -300 41 -115 102 -288 137 -384 34 -96 80 -228 103 -292 l42 -118 317 0 318 0 2 928 3 927 173 3 172 2 0 140 0 140 -875 0 -875 0 0 -1070z m1080 -107 c0 -493 -2 -894 -4 -892 -5 4 -326 887 -326 894 0 3 24 5 54 5 81 0 157 18 184 43 57 53 57 50 60 465 3 324 5 382 18 382 12 0 14 -124 14 -897z"/>
                            </g>
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    );
}
