import React from 'react';

const TrackingPage = () => {
  return (
    <div className="aboutContainer">
      <header className="aboutHero">
        <h1 className="aboutHeroTitle">Order Tracking</h1>
        <p className="aboutHeroSubtitle">
          Keep tabs on your order from our warehouse to your front door.
        </p>
      </header>
      <section className="aboutSection">
        <div className="aboutContent">
          <h2>Track Your Order</h2>
          <p>Once your order has shipped, you'll receive an email with a tracking number.</p>
          <h2>Where's My Package?</h2>
          <p>Please allow 24-48 hours for tracking information to update once your order has been fulfilled.</p>
        </div>
      </section>
    </div>
  );
};

export default TrackingPage;
