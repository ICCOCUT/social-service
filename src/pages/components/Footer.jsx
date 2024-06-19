import Link from "next/link";
import Image from "next/image";


export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900">
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex justify-center text-teal-600 dark:text-teal-300 space-x-8">
                <Image src="/images/Logotipos/CUT.png" alt="Cut logo" width={300} height={100} />
                <Image src="/images/Logotipos/DHA.png" alt="DHA logo" width={150} height={100} />
                <Image src="/images/Logotipos/UDG.png" alt="UDG logo" width={300} height={100} />
            </div>
                
                <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt consequuntur amet culpa cum
                    itaque neque.
                </p>

                <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                    <li>
                        <Link
                            className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                            href="/CostCalculator"
                        >
                            Tiempo por Hora
                        </Link>
                    </li>

                    <li>
                        <Link
                            className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                            href="/BreakEvenPoint"
                        >
                            Punto de Equilibrio
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );

}
