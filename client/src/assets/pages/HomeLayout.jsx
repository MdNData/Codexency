import React from "react";
import { ScrollProvider } from "../utils/ScrollToTop";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <ScrollProvider>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </ScrollProvider>
  );
};

export default HomeLayout;
