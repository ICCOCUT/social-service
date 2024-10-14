import Link from "next/link";
import Image from "next/image";


export default function Footer() {
    return (
        <footer className="bg-gray-900">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex justify-center text-teal-300 space-x-8">
                    {/*<Image src="/images/Logotipos/CUT.png" alt="Cut logo" width={300} height={100} />*/}
                    <Image src="/images/Logotipos/DHA.png" alt="DHA logo" width={150} height={100} />
                    {/*<Image src="/images/Logotipos/UDG.png" alt="UDG logo" width={300} height={100} />*/}
                </div>
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

            </div>
        </footer>
    );

}
