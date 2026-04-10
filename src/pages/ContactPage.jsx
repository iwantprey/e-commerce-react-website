import React from 'react';

const ContactPage = () => {
  return (
    <div className="aboutContainer">
      <header className="aboutHero">
        <h1 className="aboutHeroTitle">Contact Us</h1>
        <p className="aboutHeroSubtitle">
          We're here to help. Reach out to us with any questions about your order or our collections.
        </p>
      </header>
      <section className="aboutSection">
        <div className="aboutContent">
          <h2>Get in Touch</h2>
          <p>Email: support@rkjr.fashion</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Fashion Ave, New York, NY 10001</p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
