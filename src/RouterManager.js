import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Main from "./components/layout/Main";

const RouterManager = () => {
  // Removed isAuthenticated prop as we will get it from global state
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/Home"
        element={
          <Main>
            <Home />
          </Main>
        }
      />
      <Route path="/Login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default RouterManager;
