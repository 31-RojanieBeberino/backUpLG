import React from 'react';
import { linkedinShare, twitterShare } from '../Global/SocialShare';

export default function Enav({ goTo }) {
  const showProduct = () => {
    document.querySelector('.VlandingMAin').classList.remove('active');
    document
      .querySelector('.productMainContainer')
      .classList.add('productActive');
    document.querySelector('.CarouselContainer').classList.add('active');
    document
      .querySelector('.popUpListMain')
      .classList.remove('productListShow');
    document.querySelector('.vnav').classList.add('active');
    document.querySelector('.chatIcon').classList.remove('productListShow');
    document.querySelector('.mobileNav').classList.toggle('openMobileNav');
    document.querySelector('.Enav').classList.add('active');
    goTo('Home');
  };
  const showSpaces = () => {
    document.querySelector('.VlandingMAin').classList.remove('active');
    document
      .querySelector('.productMainContainer')
      .classList.remove('productActive');
    document.querySelector('.CarouselContainer').classList.remove('active');
    document.querySelector('.Enav').classList.add('active');
    document.querySelector('.vnav').classList.remove('active');
    // document.querySelector('.Enav').classList.add('EnavActive');
    // document.querySelector('.Enav').classList.remove('active');
    document.querySelector('.chatIcon').classList.remove('active');
    goTo('Home');
  };
  const showExplore = () => {
    document
      .querySelector('.productMainContainer')
      .classList.remove('productActive');
    document
      .querySelector('.popUpListMain')
      .classList.remove('productListHide');
    document.querySelector('.CarouselContainer').classList.add('active');
    document.querySelector('.popUpListMain').classList.add('productListShow');
    document.querySelector('.vnav').classList.add('active');
    document.querySelector('.chatIcon').classList.remove('active');
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
        <button onClick={showProduct} className='product'>
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
    <div>
      <div className='navMenu productPageMenu Enav'>
        <div className='productMenuInner'>
          <div className='mainLogo'>
            <ul className='Logo'>
              <button onClick={showSpaces}><li>LG DigiTour</li></button>
            </ul>
          </div>
          <div className='menuListBurgerMenu productMenuList'>
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
                <img
                  className='menu'
                  src='/assets/img/icons/Menu.svg'
                  alt='logo'
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
