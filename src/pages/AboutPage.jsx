import React, { useRef } from 'react';
import '../styles/AboutPage.css';
import { gsap, useGSAP } from '../lib/gsap.js';

const AboutPage = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', clearProps: 'all' } });

    tl.from('.aboutHeroTitle', {
      y: 40,
      autoAlpha: 0,
      duration: 1,
    })
      .from('.aboutHeroSubtitle', {
        y: 20,
        autoAlpha: 0,
        duration: 0.8,
      }, '-=0.6')
      .from('.aboutSection', {
        y: 40,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 1,
        scrollTrigger: {
          trigger: '.aboutSection',
          start: 'top 85%',
        },
      }, '-=0.4')
      .from('.valueCard', {
        y: 30,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.valuesGrid',
          start: 'top 88%',
        },
      }, '-=0.4');
  }, { scope: containerRef });

  return (
    <div className="aboutContainer" ref={containerRef}>
      <header className="aboutHero">
        <h1 className="aboutHeroTitle">RKJR: Crafting a Modern Narrative</h1>
        <p className="aboutHeroSubtitle">
          Born from a desire to bridge the gap between high-fashion silhouettes and everyday comfort. 
          Discover curated silhouettes, premium basics, and the story behind our journey.
        </p>
      </header>

      <section className="aboutSection">
        <div className="aboutImage">
          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" alt="Fashion Design Process" />
        </div>
        <div className="aboutContent">
          <h2>Our Story</h2>
          <p>
            Founded in 2024, RKJR was built on the belief that clothing should be an intentional extension of one's identity. 
            We saw a world where high-fashion was often inaccessible and everyday basics were often uninspired. 
            Our journey began with a single mission: to create a sharper, softer modern wardrobe.
          </p>
          <p>
            Every piece in our collection is designed with a focus on silhouette, texture, and durability. 
            We prioritize quality over quantity, crafting timeless pieces that transition effortlessly from a creative studio to a city night.
          </p>
        </div>
      </section>

      <section className="aboutSection reverse">
        <div className="aboutContent">
          <h2>The Craftsmanship</h2>
          <p>
            We believe that modern fashion should not only look good but feel good. 
            Our design process involves meticulous selection of premium fabrics—from Italian wools to sustainable organic cottons.
          </p>
          <p>
            By working closely with local artisans and small-scale manufacturers, we ensure that every stitch meets our high standards of quality. 
            It's not just about making clothes; it's about creating enduring garments that you'll reach for season after season.
          </p>
        </div>
        <div className="aboutImage">
          <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800" alt="Tailoring Details" />
        </div>
      </section>

      <section className="valuesGrid">
        <div className="valueCard">
          <div className="valueIcon">✦</div>
          <h3>Intentional Design</h3>
          <p>Every silhouette is considered, every detail has a purpose. We don't follow trends; we create lasting style.</p>
        </div>
        <div className="valueCard">
          <div className="valueIcon">◈</div>
          <h3>Curated Quality</h3>
          <p>We source only the finest materials, ensuring that our garments feel as premium as they look.</p>
        </div>
        <div className="valueCard">
          <div className="valueIcon">✧</div>
          <h3>Effortless Style</h3>
          <p>Our pieces are designed to be mixed, matched, and lived in. Modern dressing made simple.</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
