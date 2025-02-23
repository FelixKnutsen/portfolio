// Journey.tsx

import React from "react";
import MyJourneyInCoding from "../components/MyJourneyInCoding";
import OtherJourney from "../components/OtherJourney";
import Footer from "../components/Footer";

const Journey: React.FC = () => {
  return (
    <>
      <MyJourneyInCoding />
      <OtherJourney />
      <Footer />
    </>
  );
};

export default Journey;
