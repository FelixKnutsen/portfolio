import React from "react";
import "./App.css";
import WelcomeSection from "./components/WelcomeSection";
import LogoCarousel from "./components/LogoCarousel";
import Experience from "./components/experience";
import Footer from "./components/footer";
import FloatingContactButton from "./components/FloatingContactButton";

const App: React.FC = () => {
  return (
    <>
      <WelcomeSection />
      <LogoCarousel />
      <Experience />
      <Footer />
      <FloatingContactButton />
    </>
  );
};

export default App;
