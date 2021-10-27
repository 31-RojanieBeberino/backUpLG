import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Contact from './Contact';

export default function PopUp({ openPopup, closeModal }) {
  const [popupData, setPopupData] = useState({
    pId: '',
    serious: '',
    title: '',
    features: [],
    carousel: [],
    specsUrl: '',
    casestudyUrl: '',
    learnmoreUrl: '',
    backgroungImg: '',
  });

  useEffect(() => {
    if (openPopup.for) {
      const data = require(`../pdata/${
        openPopup.for || '15z90n-n.aps9u1'
      }.json`);

      setPopupData(popupData => ({ ...popupData, ...data }));
    } else {
      // setPopupData({});
      const data = require(`../pdata/15z90n-n.aps9u1.json`);

      setPopupData(popupData => ({ ...popupData, ...data }));
    }
  }, [openPopup]);

  const [index, setIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [intervalTime, setIntervalTime] = useState('3200');

  const handleSelect = (selectedIndex, e) => {
    // selects all video elements
    const videoElss = document.querySelectorAll('.video-player');

    // check if video element exists
    if (videoElss && videoElss.length > 0) {
      // loop through all video elemets

      for (let videoEl of videoElss) {
        // pause every element
        videoEl.pause();
      }
    }

    if (!videoPlaying || e) {
      videoPlaying && setVideoPlaying(false);
      setIndex(selectedIndex);
    }
  };

  const handlePlay = () => {
    setVideoPlaying(true);
    setIntervalTime(null);
  };

  const handlePause = () => {
    setVideoPlaying(false);
    setIntervalTime('3200');
  };

  const PopupImg = "url('./assets/img/modal-bg.png')";

  const FlipOver = () => {
    document.querySelector('.flipOver').classList.add('flipOverActive');
    // document.querySelector('.flip-back').classList.add('flip-backActive');
    document.querySelector('.backForm').classList.add('backFormActive');
    document.querySelector('.carousel').classList.add('carouselActive');
    document
      .querySelector('.productModalContent')
      .classList.add('productModalContentActive');
  };

  const pointer = () => {
    document.querySelector('.productModalMain').classList.add('cursor');
    // console.log('have hoverd====>');
  };

  return (
    <div onMouseEnter={() => pointer()} className='productModalMain openModal'>
      <button className='outSideClose' onClick={() => closeModal()}>
        <div className='bgImgProduct'></div>
      </button>
      <div className='flipOver'>
        <div
          className='productModalContent'
          style={{ backgroundImage: PopupImg }}
        >
          <button className='prdClose' onClick={() => closeModal()}></button>
          <Carousel
            interval={intervalTime}
            activeIndex={index}
            controls={true}
            onSelect={handleSelect}
          >
            {popupData.carousel &&
              popupData.carousel.map((item, key) => (
                <Carousel.Item key={key}>
                  {item.isVideo ? (
                    <div
                      className='embed-responsive embed-responsive-16by9'
                      style={{ height: '800px' }}
                    >
                      <video
                        className='video-player'
                        controls
                        loop
                        onPlay={handlePlay}
                        onPause={handlePause}
                      >
                        <source src={item.path} type='video/mp4' />
                        <track
                          src=''
                          kind='captions'
                          srcLang='en'
                          label='english_captions'
                        />
                      </video>
                      <div className='playpause'></div>
                    </div>
                  ) : (
                    <img
                      className={item.fullview ? 'sliderImg' : 'sliderImg'}
                      src={item.path}
                      alt={item.altName}
                    />
                  )}
                </Carousel.Item>
              ))}
          </Carousel>

          <div className='prdContentBottom'>
            <div className='prdContentDitails'>
              <div className='prdHeadSudTitle'>
                <hr className='prdLione' />
                <span className='prdSeries'>{popupData.serious}</span>
                <span className='prdDtlTitle'>{popupData.title}</span>
              </div>
              <div className='prdBodyDitails'>
                <div className='prdSpexs'>
                  <ul>
                    {popupData.features.slice(1).map((specs, index) => {
                      return <li key={index}>{specs}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className='prdButton'>
              <div className='prdbtnSection'>
                {popupData.casestudyUrl ? (
                  <a
                    href={popupData.casestudyUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <button id='casestudy' className='inquiryToBuy'>
                      <img
                        src='/assets/img/icons/boardFinal.svg'
                        alt='Group (3)'
                      />
                      Case study
                    </button>
                  </a>
                ) : null}

                {popupData.specsUrl ? (
                  <a
                    href={popupData.specsUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <button id='specsheet' className='closeWindow'>
                      <img src='/assets/img/icons/sheet.svg' alt='Close' />
                      Spec Sheet
                    </button>
                  </a>
                ) : null}

                {popupData.learnmoreUrl ? (
                  <a
                    href={popupData.learnmoreUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <button id='learnmore' className='LearnMore'>
                      <img src='/assets/img/icons/link.png' alt='Group (2)' />
                      Learn More At LG.com
                    </button>
                  </a>
                ) : null}
              </div>
              <button
                onClick={FlipOver}
                id='inquiry'
                className='inquiry-to-buy'
              >
                Inquiry to Buy
                <img src='/assets/img/icons/red-arrow-right.svg' alt='Close' />
              </button>
            </div>
          </div>
        </div>
        <div className='backForm'>
          <Contact closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}
