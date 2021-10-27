import React from 'react';

const FooterMenu = [
  {
    index: 0,
    list: <a rel="noopener noreferrer" target="_blank" href="https://www.lg.com/us/business/commercial-display/vertical-markets/corporate-solutions" > Corporate Solutions </a> ,
  },
  {
    index: 1,
    list: <a rel="noopener noreferrer" target="_blank" href="https://www.lg.com/us/business/commercial-display/vertical-markets/corporate-solutions" > Education </a> ,
  },
  {
    index: 2,
    list: <a rel="noopener noreferrer" target="_blank" href="https://www.lg.com/us/business/commercial-display/vertical-markets/government-solutions" > Government </a> ,
  },
  {
    index: 3,
    list: <a rel="noopener noreferrer" target="_blank" href="https://www.lg.com/us/business/commercial-display/vertical-markets/healthcare-solutions" > Healthcare </a> ,
  },
  {
    index: 4,
    list: <a rel="noopener noreferrer" target="_blank" href="https://www.lg.com/us/business/commercial-display/vertical-markets/hospitality-solutions" > Hospitality </a> ,
  },
  {
    index: 5,
    list: <a rel="noopener noreferrer" target="_blank" href="https://www.lg.com/us/business/commercial-displays/vertical-markets/public-venue" > Public Venue </a> ,
  },
  {
    index: 6,
    list: <a rel="noopener noreferrer" target="_blank" href="https://www.lg.com/us/business/commercial-display/vertical-markets/retail-solutions" > Retail </a> ,
  },
  {
    index: 7,
    list: <a rel="noopener noreferrer" target="_blank" href="https://www.lg.com/us/business/commercial-display/vertical-markets/restaurants-qsr-solutions" > Restaurants QSR </a> ,
  },
  {
    index: 8,
    list: <a rel="noopener noreferrer" target="_blank" href="https://www.lg.com/us/business/commercial-display/vertical-markets/transportation-solutions" > Transportation </a> ,
  },
];
const footer = () => {
  return (
    <div className='mainFooter'>
      <div className='footerContent'>
        <div className='footerHead'>
          <div className='footerVisit'>
            <div
              className='IconVisit'
              background='/assets/img/icons/top-right-r-New.svg'
            ></div>
            <button className="visitlg"><a rel="noopener noreferrer" target="_blank" id="visitlg" href="https://www.lg.com/us/business">Visit LG.com</a></button>
          </div>
          <div className='footerInquiry'>
            <div
              className='IconInquiry'
              background='/assets/img/icons/account-r-New.svg'
            ></div>
            <button className="inquiry"><a rel="noopener noreferrer" target="_blank" href="https://www.lg.com/us/business/inquiry-to-buy">Inquiry to Buy</a></button>
          </div>
        </div>
        <hr className='footerline' />
        <div className='footerMenu'>
          <ul className='allList'>
            {FooterMenu.map(fmenu => {
              return <li key={fmenu.index}>{fmenu.list}</li>;
            })}
          </ul>
        </div>
        <div className='footerRights'>
          <span>
            Copyright © 2019-2021 LG Electronics. All Rights Reserved | All
            screen images are simulated | <a rel="noopener noreferrer" target="_blank" href="https://www.lg.com/us/business/privacy"> Privacy</a> | <a rel="noopener noreferrer" target="_blank" href="https://www.lg.com/us/terms" >Terms and Conditions</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default footer;
