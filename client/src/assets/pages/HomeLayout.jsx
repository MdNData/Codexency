import React from "react";
import { ScrollProvider } from "../utils/ScrollToTop";
import NavBar from "../components/NavBar/NavBar";

const HomeLayout = () => {
  return (
    <ScrollProvider>
      <NavBar />
    </ScrollProvider>
  );
};

export default HomeLayout;
