import React from 'react'
import "./App.css";
import { BrowserRouter  as Router, Routes, Route, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Main from "./components/Main";
import image1 from "./components/images/blob 5.png";
import image2 from "./components/images/blobs.png";

function App(){
  return (
    <Router>
      <AppContent/>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();


  

  return (
    <>
      {location.pathname !== "/main" ? (
        <div className="App flex justify-center items-center">
        <div className="bg-[#F5F7FB] w-[550px] h-[550px] flex flex-col justify-center items-center relative mt-[100px] rounded-[12px]">
        <h1 className="text-[#293264] text-[32px]">Quizzical</h1>
        <p className="text-[#293264] text-[14px]">
          Expand your horizons with our sophisticated quizzes.
        </p>
        <NavLink
          exact = "true" className="bg-[#4D5B9E] w-[150px] h-[52px] rounded-[14px] mt-[18px] text-white flex justify-center items-center"
          to="/main" 
        >Start Quiz</NavLink>
        <img
          src={image1}
          className="absolute top-0 right-0 rounded-[12px]"
          alt=" "
        />
        <img
          src={image2}
          className="absolute bottom-0 left-0 rounded-[12px]"
          alt=" "
        />
      </div>
      </div>
      ) : null}
    <Routes>
    <Route path="/main" element={<Main />} />
  </Routes>
  </>
  );
}

export default App;
