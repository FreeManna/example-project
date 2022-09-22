import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import Home from "../Home";

export const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </main>
    </div>
  );
};
