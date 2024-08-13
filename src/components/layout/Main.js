import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";

const Main = ({ children }) => {
  return (
    <div className="main-container">
      <Header />
      <Body>{children}</Body>
      <Footer />
    </div>
  );
};

export default Main;
