import React from "react";
import BriefsPage from "./pages/BriefsPage";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "normalize.css";
import "./styles/style.scss";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<BriefsPage />} path="/briefs" />
        </Routes>
      </Router>
    </>
  );
};

export default App;
