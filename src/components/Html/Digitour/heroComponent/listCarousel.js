import React, { useState, useEffect } from 'react';
import Video from './Video';

const ListComponent = ({ goTo, slides, Status }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const [slideRight1, SetSlideRight1] = useState(current + 1);
  const [slideRight2, SetSlideRight2] = useState(current + 2);
  const [slideRight3, SetSlideRight3] = useState(current + 3);
  const slide = slides.filter(d => d.index === current)[0];
  const slidesRight1 = slides.filter(d => d.index === slideRight1)[0];
  const slidesRight2 = slides.filter(d => d.index === slideRight2)[0];
  const slidesRight3 = slides.filter(d => d.index === slideRight3)[0];
  const [chatInitiated, setChatInitiated] = useState(false);

  const chatEnabler = async e => {
    e.preventDefault();

    const isChatMaximized = document.querySelector('.sidebarMaximized');

    if (chatInitiated) {
      try {
        !isChatMaximized && window.embedded_svc.liveAgentAPI.startChat();
      } catch (err) {
        // console.error("Error Starting Chat:", err);
      }
    } else {
      try {
        window.embedded_svc.inviteAPI.inviteButton.acceptInvite();
      } catch (err) {
        // console.error("Error Accepting Chat Invite:", err);
      }
      setChatInitiated(true);
    }
  };

  const nextSlide = () => {
    if (current === length - 4) {
      setCurrent(current + 1);
      SetSlideRight1(current + 2);
      SetSlideRight2(current + 3);
      SetSlideRight3(0);
    } else if (current === length - 3) {
      setCurrent(current + 1);
      SetSlideRight1(current + 2);
      SetSlideRight2(0);
      SetSlideRight3(1);
    } else if (current === length - 2) {
      setCurrent(current + 1);
      SetSlideRight1(0);
      SetSlideRight2(1);
      SetSlideRight3(2);
    } else if (current >= length - 1) {
      setCurrent(0);
      SetSlideRight1(1);
      SetSlideRight2(2);
      SetSlideRight3(3);
    } else {
      setCurrent(current + 1);
      SetSlideRight1(current + 2);
      SetSlideRight2(current + 3);
      SetSlideRight3(current + 4);
    }
  };

  const prevSlide = () => {
    if (current === 0) {
      setCurrent(current + 14);
      SetSlideRight1(0);
      SetSlideRight2(1);
      SetSlideRight3(2);
    } else if (current === 14) {
      setCurrent(current - 1);
      SetSlideRight1(current);
      SetSlideRight2(0);
      SetSlideRight3(1);
    } else if (current === 13) {
      setCurrent(current - 1);
      SetSlideRight1(current);
      SetSlideRight2(current + 1);
      SetSlideRight3(0);
    } else {
      setCurrent(current - 1);
      SetSlideRight1(current);
      SetSlideRight2(current + 1);
      SetSlideRight3(current + 2);
    }
  };

  useEffect(() => {
    const BarAni = document.querySelector('.hr2');
    const BarAni2 = document.querySelector('.hrSec');
    if (current <= 3) {
      BarAni.classList.add('barAnim1');
      BarAni2.classList.add('barAnim1');
    } else if (current > 3 && current <= 7) {
      BarAni.classList.add('barAnim2');
      BarAni2.classList.add('barAnim2');
    } else if (current > 7 && current <= 11) {
      BarAni.classList.add('barAnim3');
      BarAni2.classList.add('barAnim3');
    } else {
      BarAni.classList.add('barAnim4');
      BarAni2.classList.add('barAnim4');
    }
  }, [current]);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  const handleClick = level => {
    goTo(level);

    document.querySelector('.mobileNav').classList.toggle('openMobileNav');
    document.querySelector('.VlandingMAin').classList.add('active');
    document.querySelector('.Enav').classList.add('EnavActive');
    document.querySelector('.Enav').classList.remove('active');
  };

  return (
    <div className='CarouselContainer'>
      <div className='scroll'>
        <div className='rightList'>
          <div key={slide.index} className='listDetials'>
            <span>LG’s Virtual Showrooms</span>
            <br />
            <h1>{slide.title}</h1>
            <br></br>
            <p>{slide.description}</p>
            <button
              id={slide.analyticID}
              onClick={
                Status === 'Connected' ? () => handleClick(slide.call) : null
              }
              className='btnStyle listCar'
            >
              <span className='btnName'>
                {Status === 'Connected'
                  ? 'Explore Space'
                  : 'Virtual Space is Loading now ...'}
              </span>
              <img src='/assets/img/icons/chevron-right.svg' alt='' />
            </button>
          </div>
          <button className='chatIcon' onClick={chatEnabler}>
            <img id='chatus' src='/assets/img/icons/chatIcon.svg' alt='' />
          </button>
          <div className='btnCarousel-bar mobile-view'>
            <div className='btnCarousel'>
              <button className='leftChevon' onClick={prevSlide}>
                <img src='/assets/img/icons/chevron-left.svg' alt='left' />
              </button>
              <button className='rightChevon' onClick={nextSlide}>
                <img src='/assets/img/icons/chevron-right.svg' alt='left' />
              </button>
            </div>
            <div className='carouselBar'>
              <hr className='hr1' />
              <hr className='hrSec' />
            </div>
            <div className='carouselNumber'>
              <span className='postNumber'>{slide.id}<span className="lengthNum">/{length}</span></span>
            </div>
          </div>
        </div>
        <div className='postMainContainer'>
          <div className='postCarousel'>
            <div id='reload' className='postInner'>
              <div
                key={slidesRight1.index}
                className='postCard smoothLeftRight'
                style={{ backgroundImage: slidesRight1.image }}
                id={slidesRight1.call}
                role='presentation'
                onClick={
                  Status === 'Connected'
                    ? () => handleClick(slidesRight1.call)
                    : null
                }
              >
                <div className='overFlowPostCard'></div>
                <button key={slidesRight1.index} id='num' className='number'>
                  {slidesRight1.id}
                </button>
                <div className='postNum'>
                  {slidesRight1.status === 'NEW' ? (
                    <span className='status'>NEW</span>
                  ) : null}
                </div>
                <hr className="hrLine" />
                <h1 className='PostTitle titleAni'>{slidesRight1.title}</h1>
              </div>

              <div
                key={slidesRight2.index}
                className='postCard smoothLeftRight'
                style={{ backgroundImage: slidesRight2.image }}
                id={slidesRight2.call}
                role='presentation'
                onClick={
                  Status === 'Connected'
                    ? () => handleClick(slidesRight2.call)
                    : null
                }
              >
                <div className='overFlowPostCard'></div>
                <button key={slidesRight2.index} id='num' className='number'>
                  {slidesRight2.id}
                </button>
                <div className='postNum'>
                  {slidesRight2.status === 'NEW' ? (
                    <span className='status'>NEW</span>
                  ) : null}
                </div>
                <hr className="hrLine" />
                <h1 className='PostTitle titleAni2'>{slidesRight2.title}</h1>
              </div>

              <div
                key={slidesRight3.index}
                className='postCard smoothLeftRight'
                style={{ backgroundImage: slidesRight3.image }}
                id={slidesRight3.call}
                role='presentation'
                onClick={
                  Status === 'Connected'
                    ? () => handleClick(slidesRight3.call)
                    : null
                }
              >
                <div className='overFlowPostCard'></div>
                <button key={slidesRight3.index} id='num' className='number'>
                  {slidesRight3.id}
                </button>
                <div className='postNum'>
                  {slidesRight3.status === 'NEW' ? (
                    <span className='status'>NEW</span>
                  ) : null}
                </div>
                <hr className="hrLine" />
                <h1 className='PostTitle titleAni'>{slidesRight3.title}</h1>
              </div>
            </div>

            <div className='btnCarousel-bar desktop'>
              <div className='btnCarousel'>
                <button className='leftChevon' onClick={prevSlide}>
                  <img src='/assets/img/icons/chevron-left.svg' alt='left' />
                </button>
                <button className='rightChevon' onClick={nextSlide}>
                  <img src='/assets/img/icons/chevron-right.svg' alt='left' />
                </button>
              </div>
              <div className='carouselBar'>
                <hr className='hr1' />
                <hr className='hr2' />
              </div>
              <div className='carouselNumber'>
                <span className='postNumber'>{slide.id}<span className="lengthNum">/{length}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {Status === 'Connected' ? <Video url={slide.video} /> : null}
    </div>
  );
};

export default ListComponent;
