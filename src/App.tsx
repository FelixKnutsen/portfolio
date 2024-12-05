import React from "react";
import "./App.css";
import WelcomeSection from "./components/WelcomeSection.tsx";
import LogoCarousel from "./components/LogoCarousel.tsx";
import Experience from "./components/Experience.tsx";
import Footer from "./components/Footer.tsx";
import FloatingContactButton from "./components/FloatingContactButton.tsx";

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
