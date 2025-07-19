import React, { useState, useEffect, useRef } from "react";
import "./GettingStarted.css";
import "@fontsource/montserrat/700.css";
import { Link } from "react-router-dom";

function GettingStarted() {
  const [activeTab, setActiveTab] = useState("none");
  const [barAnimated, setBarAnimated] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [showRedOverlay, setShowRedOverlay] = useState(true);
  const [formValues, setFormValues] = useState({ project: "" });
  const [showGif, setShowGif] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [formActiveTab, setFormActiveTab] = useState("none");
  const [messageVisible, setMessageVisible] = useState(false);
  const [aiResults, setAiResults] = useState(null);
  const [modalImg, setModalImg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Reference for the search bar (bottom bar section)
  const searchBarRef = useRef(null);

  useEffect(() => {
    const overlayTimer = setTimeout(() => setShowRedOverlay(false), 1600);
    const barTimer = setTimeout(() => setBarAnimated(true), 10);
    const contentTimer = setTimeout(() => setContentVisible(true), 2000);

    return () => {
      clearTimeout(overlayTimer);
      clearTimeout(barTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, project: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setContentVisible(false);
    setResultsVisible(false);
    setFormActiveTab(activeTab);
    setShowGif(true);
    setMessageVisible(false);

    try {
      const response = await fetch("http://localhost:3001/server/generate_project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: activeTab, ...formValues })
      });

      const data = await response.json();
      console.log("Raw API Response:", data); // Log raw data to check if it's being returned correctly
      setAiResults(data); // Set the data to aiResults state
    } catch (error) {
      console.error("AI generation error:", error);
      setAiResults({ error: "Failed to generate AI results." });
    }

    setLoading(false); // Stop loading
    setTimeout(() => {
      setShowGif(false);
      setResultsVisible(true);
      setMessageVisible(true);
    }, 2000);
  };

  const handleQuickClick = () => {
    setActiveTab((prev) => (prev === "quick" ? "none" : "quick"));
    setResultsVisible(false);
    setShowGif(false);
    setContentVisible(true);
    setMessageVisible(false);

    // Scroll to the search bar section when the circle button is clicked
    if (searchBarRef.current) {
      searchBarRef.current.scrollIntoView({
        behavior: "smooth", // Smooth scroll
        block: "start", // Scroll to the start of the element
      });
    }
  };

  const renderResults = () => {
    if (!aiResults || aiResults.error) {
      return <div className="gs-form"><p>Error: {aiResults?.error || "Unknown error"}</p></div>;
    }

    console.log("AI Results:", aiResults);

    return (
      <form className="gs-form">
        <h2>Quick AI Results:</h2>
        <h3 className="click">Click the button to search again</h3>

        {aiResults.sources?.length > 0 && (
          <div className="gs-sources">
            <h3 style={{ color: "#F8E750", marginBottom: "10px" }}>Related Articles</h3>
            {aiResults.sources.slice(0, 2).map((src, i) => ( // Only display two articles
              <p key={i}>
                📰 <a href={src.url} target="_blank" rel="noopener noreferrer">{src.title}</a>:{" "}
                <span style={{ color: "#ccc" }}>{src.description}</span>
              </p>
            ))}
          </div>
        )}

        {aiResults.stock?.length > 0 && (
          <div className="gs-gallery">
            {aiResults.stock.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.alt}
                className="gs-thumb"
                onClick={() => setModalImg(img.full)}
              />
            ))}
          </div>
        )}

        {aiResults.videos?.length > 0 && (
          <div className="gs-gallery">
            {aiResults.videos.map((vid, i) => (
              <a key={i} href={vid.url} target="_blank" rel="noopener noreferrer" className="gs-video">
                <img src={vid.thumbnail} alt={vid.title} className="gs-thumb" />
                <p style={{ textAlign: "center", maxWidth: "160px" }}>{vid.title}</p>
              </a>
            ))}
          </div>
        )}

        {aiResults.tip && (
          <p style={{ marginTop: "20px", fontStyle: "italic", color: "#F8E750" }}>💡 {aiResults.tip}</p>
        )}

        {modalImg && (
          <div className="gs-modal" onClick={() => setModalImg(null)}>
            <img src={modalImg} alt="Zoom" className="gs-modal-content" />
          </div>
        )}
      </form>
    );
  };

  return (
    <div className="gs-container">
      {showRedOverlay && <div className="gs-red-overlay"></div>}

      <div className="gs-upper-bar">
        <Link to="/" className="home-btn">Home Page</Link>
        <div className="gs-header-text">
          <h1>
            Need to create a short social media hit piece about politics? Maybe a documentary style YouTube video about a videogame? Or maybe an online article on the joy of baking? Whether you need a variety of visual assets to add to your project or sources for your research, with DashAI we use the power of AI to give you a quick, helping hand to quick start your project. Choose an option below to start!
          </h1>
        </div>
      </div>

      <div className="gs-middle-button-wrapper">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button className="gs-toggle-button" onClick={handleQuickClick}>
            <i className="fa-solid fa-bolt fa-beat" style={{ "--fa-animation-duration": "0.8s", fontSize: "50px", color: "#F23D60" }}></i>
          </button>
        </div>
      </div>

      <div className={`gs-bottom-bar ${barAnimated ? "morphed" : ""}`} ref={searchBarRef}> {/* Added ref here */}
        <div className="gs-bottom-inner">
          {showGif && (
            <img
              src="https://raw.githubusercontent.com/Rick-ORick/Dash/main/shooting.gif"
              alt="Processing..."
              className="left-star"
            />
          )}

          {contentVisible && activeTab === "quick" && (
            <div className="gs-form">
              <h2>Let’s generate a quick set of assets for you!</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Let’s generate a quick set of assets for you!"
                  value={formValues.project}
                  onChange={handleInputChange}
                  className="gs-input"
                />
                <button type="submit" className="gs-submit-button">Generate</button>
              </form>
            </div>
          )}

          {resultsVisible && renderResults()}
        </div>
      </div>
    </div>
  );
}

export default GettingStarted;
