import React from 'react';
import ProductComponent from '../Html/Home/productComponent';
import Pnav from '../Html/Digitour/Pnav';

export default function Products({ goTo, Status }) {
  return (
    <div className='productMainContainer'>
      <Pnav goTo={goTo} />

      <ProductComponent Status={Status} goTo={goTo} />
    </div>
  );
}
