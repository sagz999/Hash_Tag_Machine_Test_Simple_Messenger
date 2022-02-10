import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./screens/HomePage/HomePage";
import SignInPage from "./screens/SignInPage/SignInPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
