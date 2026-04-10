import React, { useRef } from 'react';
import '../styles/TestimonialSection.css';
import { gsap, useGSAP } from '../lib/gsap.js';

const testimonials = [
  {
    id: 1,
    quote: 'RKJR made my wardrobe feel instantly more elevated. Every piece feels curated, not generic.',
    name: 'Ava Santos',
    role: 'Style Member',
  },
  {
    id: 2,
    quote: 'The fit, the textures, and the styling direction all feel premium. It is my go-to for clean statement looks.',
    name: 'Miguel Reyes',
    role: 'Creative Lead',
  },
  {
    id: 3,
    quote: 'I love how easy it is to build full outfits here. The collection feels modern without trying too hard.',
    name: 'Clara Mendoza',
    role: 'Frequent Shopper',
  },
];

const TestimonialSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.testimonialHeader > *', {
      y: 18,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'expo.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
      },
    });

    gsap.from('.testimonialCard', {
      y: 30,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'expo.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: '.testimonialGrid',
        start: 'top 88%',
      },
    });
  }, { scope: sectionRef });

  return (
    <section className="testimonialSection" ref={sectionRef}>
      <div className="testimonialHeader">
        <p className="testimonialEyebrow">Community Notes</p>
        <h2 className="sectionTitle">Loved by people building a sharper everyday style</h2>
        <p className="sectionSubtitle">
          Real feedback from customers who keep coming back for the balance of comfort, polish, and effortless styling.
        </p>
      </div>

      <div className="testimonialGrid">
        {testimonials.map((testimonial) => (
          <article key={testimonial.id} className="testimonialCard">
            <div className="testimonialAccent" />
            <span className="testimonialMark">"</span>
            <p className="testimonialQuote">{testimonial.quote}</p>
            <div className="testimonialMeta">
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
