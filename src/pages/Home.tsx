import React from "react";
import WelcomeSection from "../components/WelcomeSection";
import LogoCarousel from "../components/LogoCarousel";
import Footer from "../components/Footer";
import Experience from "../components/Experience";

const Home: React.FC = () => {
  return (
    <>
      <WelcomeSection />
      <LogoCarousel />
      <Experience />
      <Footer />
    </>
  );
};

export default Home;
