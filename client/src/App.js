import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComposeMessagePage from "./screens/ComposeMessagePage/ComposeMessagePage";
import InboxPage from "./screens/InboxPage/InboxPage";
import SignInPage from "./screens/SignInPage/SignInPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/compose" element={<ComposeMessagePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
