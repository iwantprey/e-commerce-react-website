import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="aboutContainer">
      <header className="aboutHero">
        <h1 className="aboutHeroTitle">Privacy Policy</h1>
        <p className="aboutHeroSubtitle">
          Your privacy is important to us. Learn how we handle your data.
        </p>
      </header>
      <section className="aboutSection">
        <div className="aboutContent">
          <h2>Data Collection</h2>
          <p>We collect only the information necessary to process your orders and provide a personalized shopping experience.</p>
          <h2>Security</h2>
          <p>We use industry-standard encryption to protect your personal and payment information.</p>
          <h2>Third Parties</h2>
          <p>We never sell your data. We share information only with trusted partners (like shipping carriers) required to fulfill your order.</p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
