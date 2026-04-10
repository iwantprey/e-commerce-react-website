import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CTASection.css';
import { gsap, useGSAP } from '../lib/gsap.js';

const CTASection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
      },
      defaults: { ease: 'expo.out', clearProps: 'all' },
    });

    tl.from('.ctaPanel', {
      y: 40,
      autoAlpha: 0,
      scale: 0.98,
      duration: 1,
    })
      .from('.ctaEyebrow', {
        y: 12,
        autoAlpha: 0,
        duration: 0.6,
      }, '-=0.6')
      .from('.ctaTitle', {
        y: 16,
        autoAlpha: 0,
        duration: 0.8,
      }, '-=0.5')
      .from('.ctaText', {
        y: 12,
        autoAlpha: 0,
        duration: 0.7,
      }, '-=0.6')
      .from('.ctaPrimaryLink, .ctaSecondaryLink', {
        y: 12,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.6,
      }, '-=0.5');

    gsap.to('.ctaRibbon', {
      xPercent: 6,
      yPercent: -10,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: sectionRef });

  return (
    <section className="ctaSection" ref={sectionRef}>
      <div className="ctaPanel">
        <div className="ctaGlow ctaGlowBlue" />
        <div className="ctaGlow ctaGlowWarm" />
        <div className="ctaRibbon ctaRibbonTop" />
        <div className="ctaRibbon ctaRibbonBottom" />
        <div className="ctaContent">
          <p className="ctaEyebrow">Ready for your next look?</p>
          <h2 className="ctaTitle">Create your account and start building your cart today</h2>
          <p className="ctaText">
            Join RKJR to unlock faster checkout, saved orders, and a smoother way to shop the latest drops.
          </p>
          <div className="ctaActions">
            <Link to="/signUp" className="ctaPrimaryLink">Create Account</Link>
            <Link to="/shop" className="ctaSecondaryLink">Browse Collection</Link>
          </div>
        </div>

        <div className="ctaStats">
          <div className="ctaStat">
            <strong>8k+</strong>
            <span>members shopping monthly</span>
          </div>
          <div className="ctaStat">
            <strong>48h</strong>
            <span>fast-moving trend updates</span>
          </div>
          <div className="ctaStat">
            <strong>Top Rated</strong>
            <span>pieces chosen for comfort and edge</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
