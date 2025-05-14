import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Footer() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isHomePage = isClient && router.pathname === "/";

    return (
        <footer className="bg-gray-900">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-center items-center text-teal-300 space-y-4 sm:space-y-0 sm:space-x-8">
                    <Image
                        src="/images/Logotipos/UdG.svg"
                        alt="UDG logo"
                        width={250}
                        height={100}
                        className="w-3/4 sm:w-auto max-w-[150px] h-auto"
                    />
                    <Image
                        src="/images/Logotipos/Cut.svg"
                        alt="Cut logo"
                        width={300}
                        height={100}
                        className="w-3/4 sm:w-auto max-w-[150px] h-auto"
                    />
                    <Image
                        src="/images/Logotipos/Dha.svg"
                        alt="DHA logo"
                        width={150}
                        height={100}
                        className="w-3/4 sm:w-auto max-w-[60px] h-auto"
                    />
                </div>
                {!isHomePage && (
                    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                        <li>
                            <Link
                                className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                href="/"
                            >
                                Volver al Inicio
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </footer>
    );
}
