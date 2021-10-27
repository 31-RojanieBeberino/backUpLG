import React, { useState } from 'react';
import DigiTour from '../pureweb/DigiTour';
import PopUp from '../Html/Global/modal/PopUp';
import Products from '../pages/Products';

export default function Virtual() {
  const [gameRes, setGameRes] = useState('');
  const [openPopup, setOpenPopup] = useState({
    for: '',
    active: false,
  });
  const openPopupHandler = name => {
    setOpenPopup({ for: name, active: true });
  };
  const closeModal = e => {
    setOpenPopup({ for: '', active: false });
  };

  return (
    <div className='mainContainer'>
      <DigiTour
        responseHandler={res => setGameRes(res)}
        gameRes={gameRes}
        openPopupHandler={openPopupHandler}
      />
      <Products />
      {openPopup.active ? (
        <PopUp openPopup={openPopup} closeModal={closeModal} />
      ) : null}
    </div>
  );
}
