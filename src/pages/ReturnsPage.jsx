import React from 'react';

const ReturnsPage = () => {
  return (
    <div className="aboutContainer">
      <header className="aboutHero">
        <h1 className="aboutHeroTitle">Returns & Exchanges</h1>
        <p className="aboutHeroSubtitle">
          If it's not the perfect fit, we've got you covered with an easy return process.
        </p>
      </header>
      <section className="aboutSection">
        <div className="aboutContent">
          <h2>Our Return Policy</h2>
          <p>You have 30 days from the date of delivery to return any item in its original, unworn condition.</p>
          <h2>How to Start a Return</h2>
          <p>Visit our returns portal, enter your order number and email, and follow the instructions to print a return label.</p>
          <h2>Exchanges</h2>
          <p>Want a different size or color? Start an exchange through our portal for the quickest replacement.</p>
        </div>
      </section>
    </div>
  );
};

export default ReturnsPage;
