import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import "./App.css";
import "@fontsource/montserrat/700.css";
import GettingStarted from './GettingStarted.js';



function App() {
  const [barAnimated, setBarAnimated] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // ✅ initialize navigate

  useEffect(() => {
    const barTimer = setTimeout(() => {
      setBarAnimated(true);
    }, 10);

    const contentTimer = setTimeout(() => {
      setContentVisible(true);
    }, 2000);

    return () => {
      clearTimeout(barTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="main-container">
      <div className="upper-portion">
        <button className="about-button" onClick={() => setShowModal(true)}>
          About
        </button>

        <img
          src="https://github.com/Rick-ORick/Dash/blob/main/star.gif?raw=true"
          alt="Star"
          className="corner-star"
        />
        <img
          src="https://github.com/Rick-ORick/Dash/blob/main/shooting.gif?raw=true"
          alt="Star"
          className="left-star"
        />
        <div className="logo-wrapper">
          <img
            src="https://github.com/Rick-ORick/Dash/blob/main/shape.png?raw=true"
            alt="shape background"
            className="shape-bg"
          />
          <img
            src="https://github.com/Rick-ORick/Dash/blob/main/logo.png?raw=true"
            alt="DashAI logo"
            className="logo"
          />
        </div>
      </div>

      <div className={`bottom-bar ${barAnimated ? "morphed" : ""}`}>
        <div className={`bottom-content ${contentVisible ? "fade-in" : ""}`}>
          <h1 className="subtitle">
            This is an AI-powered content recommendation dashboard<br />
            designed to help facilitate your content creation routine<br />
            in a simple and easy way. Get started today!
          </h1>
          <button className="start-button" onClick={() => navigate("/gettingstarted")}>
            Start
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>
              This is a landing page created by Henrique Oliveira, especifically for Media Alacarte.<br />To view more of my Frontend and Ux/Ui projects, please visit my{" "}
              <a
                href="https://portfolio-git-main-ricks-projects-08c86335.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#F23D60" }}
              >
                Portfolio
              </a>
            </p>
            <button className="close-about" onClick={() => setShowModal(false)}>
              Close About
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
