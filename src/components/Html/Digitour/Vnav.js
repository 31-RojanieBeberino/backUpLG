import React from 'react';
import { linkedinShare, twitterShare } from '../Global/SocialShare';

const Vnav = ({ goTo }) => {
  const showPages = () => {
    document
      .querySelector('.productMainContainer')
      .classList.add('productActive');
    document.querySelector('.CarouselContainer').classList.add('active');
    document
      .querySelector('.popUpListMain')
      .classList.remove('productListShow');
    document.querySelector('.vnav').classList.add('active');
    document.querySelector('.chatIcon').classList.add('active');
    document.querySelector('.Enav').classList.remove('EnavActive');
  };
  const showExplore = () => {
    document
      .querySelector('.productMainContainer')
      .classList.remove('productActive');
    document
      .querySelector('.popUpListMain')
      .classList.remove('productListHide');
    document.querySelector('.popUpListMain').classList.add('productListShow');
    document.querySelector('.chatIcon').classList.remove('active');
    document.querySelector('.vnav').classList.remove('active');
    document.querySelector('.Enav').classList.remove('EnavActive');
    goTo('Home');
  };
  const showSpaces = () => {
    document
      .querySelector('.productMainContainer')
      .classList.remove('productActive');
    document.querySelector('.CarouselContainer').classList.remove('active');
    document.querySelector('.vnav').classList.remove('active');
    document
      .querySelector('.popUpListMain')
      .classList.remove('productListShow');
    document.querySelector('.VlandingMAin').classList.remove('active');
    document.querySelector('.Enav').classList.remove('EnavActive');
    goTo('Home');
  };

  const menu = [
    {
      index: 1,
      list: (
        <button onClick={showSpaces} className='spaces'>
          Spaces
        </button>
      ),
    },
    {
      index: 2,
      list: (
        <button onClick={showPages} className='product'>
          Product
        </button>
      ),
    },
    {
      index: 3,
      list: (
        <button onClick={showExplore} className='explore'>
          Explore
        </button>
      ),
    },
  ];

  return (
    <div className='navMenu vnav'>
      <div className='mainLogo'>
        <ul className='Logo'>
          <button onClick={showSpaces}><li>LG DigiTour</li></button>
        </ul>
      </div>
      <div className='menuListBurgerMenu vnavList'>
        <ul>
          {menu.map(l => {
            return <li key={l.index}>{l.list}</li>;
          })}
        </ul>
        <div className='burgerMenu vnavIcons'>
        <a
          href='/'
          onClick={linkedinShare}
          aria-label='Share on LinkedIn'
          tabIndex='0'
        >
          <img src='/assets/img/icons/INlogo.png' alt='logo' />
        </a>
        <a
          href='/'
          onClick={twitterShare}
          aria-label='Share on Twitter'
          tabIndex='0'
        >
          <img src='/assets/img/icons/tweetLogo.png' alt='logo' />{' '}
        </a>
          <button
            onClick={() =>
              document
                .querySelector('.mobileNav')
                .classList.toggle('openMobileNav')
            }
            className='menuBtn'
          >
            <img className='menu' src='/assets/img/icons/Menu.svg' alt='logo' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vnav;
