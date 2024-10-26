import Head from 'next/head';
import '../styles/globals.css';
import Footer from "@/pages/components/Footer";

function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>Baluarte</title>
            </Head>
            <Component {...pageProps} />
            <Footer/>
        </>
    );
}

export default MyApp;
