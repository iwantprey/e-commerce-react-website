import React from 'react';
import '../styles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="heroContainer">
      <div className="heroContent">
        <h1 className="heroTitle">RKJR Fashion</h1>
        <p className="heroSubtitle">
          Discover curated collections that blend comfort with modern elegance. 
          From essential basics to statement pieces, find your perfect look today.
        </p>
        <div className="heroActions">
          <button className="ctaButton">Shop Now</button>
          <button className="secondaryButton">View Lookbook</button>
        </div>
      </div>
      <div className="heroGraphic">
        <img src="https://placehold.co/600x400/e9ecef/495057?text=Autumn+Collection+2024" alt="Hero Illustration" />
      </div>
    </section>
  );
};

export default HeroSection;