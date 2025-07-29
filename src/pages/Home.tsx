import Hero from "../sections/Hero";
import Services from "../sections/Services";
import About from "../sections/About";
import News from "../sections/News";
import Contact from "../sections/Contact";

import Team from "../sections/Team";
import Testimonials from "../sections/Testimonials";

const Home = () => {
    return (
        <>
            <Hero />
            <Services />
            <About />
            <Team />
            <Testimonials />
            <News />
            <Contact />
        </>
    );
};

export default Home;
