import React from 'react';
import ListCarousel from './listCarousel';
import { SliderData } from './SliderData';

const CarouselComponent = ({ goTo, Status }) => {
  return (
    <div>
      <ListCarousel slides={SliderData} Status={Status} goTo={goTo} />
    </div>
  );
};

export default CarouselComponent;
