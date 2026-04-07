import React, { useRef } from 'react';
import '../styles/HeroSection.css';
import { gsap, useGSAP } from '../lib/gsap.js';

const HeroSection = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.heroEyebrow', {
      y: 20,
      autoAlpha: 0,
      duration: 0.45,
    })
      .from('.heroTitle', {
        y: 42,
        autoAlpha: 0,
        duration: 0.7,
      }, '-=0.15')
      .from('.heroSubtitle', {
        y: 28,
        autoAlpha: 0,
        duration: 0.55,
      }, '-=0.38')
      .from('.heroActions button', {
        y: 24,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.45,
      }, '-=0.28')
      .from('.heroStat', {
        y: 20,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.35,
      }, '-=0.15')
      .from('.heroGraphic', {
        x: 40,
        autoAlpha: 0,
        scale: 0.92,
        duration: 0.8,
      }, '-=0.8');

    gsap.to('.heroGraphic', {
      y: -16,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.heroGraphic img', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to('.heroGlow', {
      scale: 1.12,
      opacity: 0.9,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: heroRef });

  return (
    <section className="heroContainer" ref={heroRef}>
      <div className="heroGlow heroGlowLeft" />
      <div className="heroGlow heroGlowRight" />
      <div className="heroContent">
        <p className="heroEyebrow">Fresh arrivals every week</p>
        <h1 className="heroTitle">RKJR Fashion</h1>
        <p className="heroSubtitle">
          Discover curated collections that blend comfort with modern elegance. 
          From essential basics to statement pieces, find your perfect look today.
        </p>
        <div className="heroActions">
          <button className="ctaButton">Shop Now</button>
          <button className="secondaryButton">View Lookbook</button>
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
        <img src="https://placehold.co/600x400/e9ecef/495057?text=Autumn+Collection+2024" alt="Hero Illustration" />
      </div>
    </section>
  );
};

export default HeroSection;
