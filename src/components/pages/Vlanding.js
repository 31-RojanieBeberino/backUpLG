import React from 'react';
import Vnav from '../Html/Digitour/Vnav';
import CarouselComponent from '../Html/Digitour/heroComponent/CarouselComponent';
import Products from '../pages/Products';
import MobileNav from '../Html/Global/modal/navMobile';

export default function Vlanding({ goLevel, Status }) {
  return (
    <div className='VlandingMAin'>
      <Vnav goTo={goLevel} />
      <MobileNav />

      <Products goTo={goLevel} Status={Status} />

      <CarouselComponent Status={Status} goTo={goLevel} />
    </div>
  );
}
