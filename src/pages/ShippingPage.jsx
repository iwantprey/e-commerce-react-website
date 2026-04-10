import React from 'react';

const ShippingPage = () => {
  return (
    <div className="aboutContainer">
      <header className="aboutHero">
        <h1 className="aboutHeroTitle">Shipping Info</h1>
        <p className="aboutHeroSubtitle">
          We offer fast, reliable shipping to ensure your new favorites reach you as quickly as possible.
        </p>
      </header>
      <section className="aboutSection">
        <div className="aboutContent">
          <h2>Standard Shipping</h2>
          <p>3-5 business days. Free for orders over $100.</p>
          <h2>Express Shipping</h2>
          <p>1-2 business days. $15 flat rate.</p>
          <h2>International Shipping</h2>
          <p>7-14 business days. Rates vary by location.</p>
        </div>
      </section>
    </div>
  );
};

export default ShippingPage;
