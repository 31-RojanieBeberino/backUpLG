import React from 'react';
import { SliderData } from '../../Digitour/heroComponent/SliderData';
import ExploreNav from '../../Digitour/ExploreNav';
import { linkedinShare, twitterShare } from '../SocialShare';

const ExploreModal = ({ goTo }) => {
  const closeListCont = () => {
    document.querySelector('.popUpListMain').classList.add('productListHide');
    document.querySelector('.ExploreNav').classList.remove('active');
  };

  const onLevelClick = level => {
    document.querySelector('.popUpListMain').classList.add('productListHide');
    goTo('Home');
    setTimeout(function () {
      goTo(level);
    }, 500);

    document.querySelector('.VlandingMAin').classList.add('active');
    document.querySelector('.Enav').classList.add('EnavActive');
    document.querySelector('.Enav').classList.remove('active');
  };

  return (
    <div className='popUpListMain'>
      <ExploreNav />
      <div className='PopUpContent'>
        <button onClick={closeListCont} className='closeListBtn'></button>
        <p className='listName'>SPACES</p>
        <hr className='PopupLine' />
        <div className='ListItems'>
          <ul>
            {SliderData.map(i => {
              return (
                <li key={i.index} className='listItem'>
                  <span className='listNumber'>{i.id}</span>
                  <button
                    id={i.analyticID}
                    onClick={() => onLevelClick(i.call)}
                  >
                    {i.title}
                    {i.status === 'new' ? (
                      <span className='status'></span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {/* <p className='listName'>SPACES GROUP 1</p> */}
        <hr className='PopupLine' />
        <div className='bottomList'>
          <span>
            Copyright © 2019-2021 LG Electronics. All Rights Reserved | All
            screen images are simulated |{' '}
            <a
              rel='noopener noreferrer'
              target='_blank'
              href='https://www.lg.com/us/business/privacy'
            >
              {' '}
              Privacy
            </a>{' '}
            |{' '}
            <a
              rel='noopener noreferrer'
              target='_blank'
              href='https://www.lg.com/us/terms'
            >
              Terms and Conditions
            </a>
          </span>
          <div className='linksIcons'>
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
      </div>
    </div>
  );
};

export default ExploreModal;
