import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/components/Login";
import ChangePassword from "./components/password/components/ChangePassword";
import Home from "./components/Home";
import Main from "./components/layout/Main";
import StudentList from "./components/students/components/StudentList";
import StudentForm from "./components/students/components/StudentForm";

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
      <Route path="/login" element={<Login />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/students" element={<StudentList />} />
      <Route
        path="/add-student"
        element={
          <Main>
            <StudentForm />{" "}
          </Main>
        }
      />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default RouterManager;
