import React from 'react';
import { linkedinShare, twitterShare } from '../Global/SocialShare';

const Nav = () => {
  return (
    <div className='navMenu'>
      <div className='mainLogo'>
        <ul className='Logo'>
          <li>LG DigiTour</li>
        </ul>
      </div>
      <div className='menuList'>
        {/* <ul>
          {menu.map( (l) => {
            return <li key={l.index}>{l.list}</li>;
          })}
        </ul> */}
      </div>
      <div className='burgerMenu'>
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
      </div>
    </div>
  );
};

export default Nav;
