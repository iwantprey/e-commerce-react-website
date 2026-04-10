import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroSection.css';
import { gsap, useGSAP } from '../lib/gsap.js';

const HeroSection = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', clearProps: 'all' } });

    tl.from('.heroEyebrow', {
      y: 14,
      autoAlpha: 0,
      duration: 0.6,
    })
      .from('.heroTitle', {
        y: 20,
        autoAlpha: 0,
        duration: 0.8,
      }, '-=0.4')
      .from('.heroSubtitle', {
        y: 18,
        autoAlpha: 0,
        duration: 0.7,
      }, '-=0.5')
      .from('.heroActions .ctaButton, .heroActions .secondaryButton', {
        y: 16,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.6,
      }, '-=0.5')
      .from('.heroGraphic', {
        x: 40,
        autoAlpha: 0,
        scale: 0.95,
        duration: 1,
        ease: 'expo.out',
      }, '-=0.8');
  }, { scope: heroRef });

  return (
    <section className="heroContainer" ref={heroRef}>
      <div className="heroGlow heroGlowLeft" />
      <div className="heroGlow heroGlowRight" />
      <div className="heroOrb heroOrbOne" />
      <div className="heroOrb heroOrbTwo" />
      <div className="heroContent">
        <p className="heroEyebrow">Fresh arrivals every week</p>
        <h1 className="heroTitle">RKJR Fashion for a sharper, softer modern wardrobe</h1>
        <p className="heroSubtitle">
          A more editorial take on everyday dressing. Discover curated silhouettes, premium basics,
          and statement layers designed to feel elevated from first wear.
        </p>
        <div className="heroActions">
          <Link to="/shop" className="ctaButton">Shop Now</Link>
          <Link to="/products" className="secondaryButton">View Lookbook</Link>
        </div>
        <div className="heroStats">
          <div className="heroStat">
            <strong>120+</strong>
            <span>curated drops</span>
          </div>
          <div className="heroStat">
            <strong>24h</strong>
            <span>new style refresh</span>
          </div>
          <div className="heroStat">
            <strong>4.9</strong>
            <span>community rating</span>
          </div>
        </div>
      </div>
      <div className="heroGraphic">
        <div className="heroGraphicFrame">
          <div className="heroGraphicBadge">Autumn Edit 2026</div>
          <img src="https://placehold.co/600x400/e9ecef/495057?text=Autumn+Collection+2024" alt="Hero Illustration" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
