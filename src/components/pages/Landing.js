import React from 'react';
import Nav from '../Html/Home/nav';
import Footer from '../Html/Home/footer';
import Hero from '../Html/Home/hero';

export default function Landing() {
  return (
    <div className='mainContainer'>
      <div className="main_InnerContainer">
        <Nav />

        <Hero />

        <Footer />
      </div>
    </div>
  );
}
