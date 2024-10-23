import Link from "next/link";

export default function Content() {
    return (
        <section className="text-gray-400 body-font bg-gray-900 min-h-screen flex flex-col justify-between">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Baluarte, herramientas
                        comerciales</h1>
                    <p>Selecciona la herramienta deseada</p>
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className="xl:w-1/3 md:w-1/2 w-full p-4 flex flex-col">
                        <Link href="/CostCalculator">
                            <div className="border border-gray-700 border-opacity-75 p-6 rounded-lg flex-grow"
                                 style={{minHeight: '200px'}}>
                                <div
                                    className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="8" r="6"/>
                                        <path d="M12 8V5m0 3h3"/>
                                        <rect x="7" y="14" width="10" height="8" rx="1"/>
                                        <path d="M9 16h2v2H9zm4 0h2v2h-2zm-4 3h2v2H9zm4 0h2v2h-2z"/>
                                    </svg>
                                </div>
                                <h2 className="text-lg text-white font-medium title-font mb-2">Cálculo del costo por
                                    hora </h2>
                                <p className="leading-relaxed text-base flex-grow">¿Cuánto vale tu tiempo?</p>
                            </div>
                        </Link>
                    </div>
                    <div className="xl:w-1/3 md:w-1/2 w-full p-4 flex flex-col">
                        <Link href="/BreakEvenPoint">
                            <div className="border border-gray-700 border-opacity-75 p-6 rounded-lg flex-grow"
                                 style={{minHeight: '200px'}}>
                                <div
                                    className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5 9h14m-4 9v-3m-6 3h.01M12 18h.01M12 15h.01M9 15h.01M15 12h.01M12 12h.01M9 12h.01m-.81 9h7.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C19 19.48 19 18.92 19 17.8V6.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C17.48 3 16.92 3 15.8 3H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 4.52 5 5.08 5 6.2v11.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C6.52 21 7.08 21 8.2 21"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <h2 className="text-lg text-white font-medium title-font mb-2">Cálculo del punto de
                                    equilibrio</h2>
                                <p className="leading-relaxed text-base flex-grow">Cuánto tengo que producir y vender
                                    para solventar mi estilo de vida.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="xl:w-1/3 md:w-1/2 w-full p-4 flex flex-col">
                        <Link href="/ProductPrice">
                            <div className="border border-gray-700 border-opacity-75 p-6 rounded-lg flex-grow"
                                 style={{minHeight: '200px'}}>
                                <div
                                    className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                         strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <h2 className="text-lg text-white font-medium title-font mb-2">Cálculo del precio de
                                    tu producto
                                </h2>
                                <p className="leading-relaxed text-base flex-grow">¿Cuánto vale tu producto?
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
