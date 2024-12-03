import React from "react";
import "./App.css";
import WelcomeSection from "./components/WelcomeSection";
import LogoCarousel from "./components/LogoCarousel";

const App: React.FC = () => {
  return (
    <>
      <WelcomeSection />
      <LogoCarousel />
    </>
  );
};

export default App;
