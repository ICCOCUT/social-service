import {Inter} from "next/font/google";
import Content from "./components/Content";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
    return (
        <main

        >
            <Content/>
        </main>
    );
}
