import React from 'react';


const ExploreNav = () => {

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
    // goTo('Home');
  };

  return (
    <div className='navMenu vnav ExploreNav'>
      <div className='mainLogo'>
        <ul className='Logo'>
          <button onClick={showSpaces}><li>LG DigiTour</li></button>
        </ul>
      </div>
      <div className='menuListBurgerMenu vnavList'>
        <div className='burgerMenu vnavIcons'>
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

export default ExploreNav;
