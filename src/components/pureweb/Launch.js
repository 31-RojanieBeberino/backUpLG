import React from 'react';
import Nav from '../Html/Home/nav';
import Footer from '../Html/Home/footer';

export const LaunchView = props => {

  return (
    <div className="heroScroll">
      <Nav />
      <div className='mainHero'>
        <div className='heroContent'>
          <div className='heroText'>
            {/* <span className='heroSubTitleHead'>LG’s Virtual Showrooms</span> */}
            <span className='heroTitle'>Welcome to LG DigiTour</span>
            <span className='heroSubTitleBot'>
            Click below to explore our 3D experience showcasing over 50 products in 15 unique environments along with product specs and applications.
            </span>
            <button className='btnStyle' id="expbtn" onClick={() => props.Launch()}>
              <span className='btnName'>EXPLORE NOW</span>
              <img src='/assets/img/icons/chevron-right.svg' alt='' />
            </button>
          </div>
        </div>
        <div className="heroVideoBgOverflow" ></div>
        <video className="heroVideoBg" autoPlay muted loop >
          <source src="./assets/videos/Landing_PreviewMultipleSpaces.mp4" type='video/mp4' />
        </video>
      </div>
      <Footer />
    </div>
  );
};
