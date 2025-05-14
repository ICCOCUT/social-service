import Head from 'next/head';
import '../styles/globals.css';
import Footer from "@/pages/components/Footer";
import Header from "@/pages/components/header"

function MyApp({Component, pageProps}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>Baluarte</title>
            </Head>
            <Header />
            <div className="flex-grow bg-gray-900">
                <Component {...pageProps} />
            </div>
            <Footer/>
        </div>
    );
}

export default MyApp;
