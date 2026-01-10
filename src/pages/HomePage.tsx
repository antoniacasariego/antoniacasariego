import { useRef } from "react";
import Hero from "../components/Hero";
import Work from "../components/Work";
import Navbar from "../components/Navbar";
// import Projects from "../components/Projects"; // later

export default function HomePage() {
    const workRef = useRef<HTMLDivElement>(null);

    const scrollToWork = () => {
        workRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div>
            <Navbar />
            <div className="page">
                <Hero onFinish={scrollToWork} />

                <div ref={workRef} id="work">
                    <Work />
                </div>

                {/* <Projects /> */}
                <footer className="footer">Antonia Casariego Oronoz</footer>
            </div>
        </div>
    );
}
