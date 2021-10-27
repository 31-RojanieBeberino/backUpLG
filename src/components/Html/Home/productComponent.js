import React, { useState } from 'react';
import { ProductsData } from './ProductsData';
import { Categories } from './Categories';
import PopUp from '../Global/modal/PopUp';

const Product = ({ goTo, Status }) => {
  const [data, setData] = useState(ProductsData);
  const length = data.length;
  const [Skip, setSkip] = useState(8);
  const Types = ProductsData.map(a => a.ptype);
  const uniqTypes = new Set(Types);
  const finalTypes = [...uniqTypes];

  const [openPopup, setOpenPopup] = useState({
    for: '',
    active: false,
  });

  const handlepopup = pid => {
    setOpenPopup({ for: pid, active: true });
  };

  const closeModal = e => {
    setOpenPopup({ for: '', active: false });
  };

  const onLoadMore = () => {
    if (Skip <= length - 8) {
      let skip = Skip + 8;
      setSkip(skip);
    } else if (Skip >= length - 8 && Skip <= length) {
      let skip = Skip + (length - Skip);
      setSkip(skip);
      document.querySelector('.loadMore').classList.add('removeBtnLaodMore');
    } else if (length <= 8 || Skip === length) {
      document.querySelector('.loadMore').classList.add('removeBtnLaodMore');
    }
  };

  const HoverBg = () => {
    const productSample1 = document.querySelector('.productSample');

    productSample1.classList.add('btnHoverBg');
  };

  const OffHoverBg = () => {
    const productSample1 = document.querySelector('.productSample');

    productSample1.classList.remove('btnHoverBg');
  };

  const handleOnChange = (e, index) => {
    if (e.target.id === '1' && e.target.checked) {
      const filteredData = ProductsData;
      setData(filteredData);
    } else if (e.target.id === String(index + 1) && e.target.id !== '1') {
      const filteredData = ProductsData.filter(
        item => item.pcategory === Categories[index].name
      );
      setData(filteredData);
    }
  };

  const handleLevel = level => {
    document.querySelector('.Enav').classList.remove('active');
    document.querySelector('.Enav').classList.add('EnavActive');
    document.querySelector('.VlandingMAin').classList.add('active');
    goTo(level);
  };

  const handleTypeFilter = e => {
    const typeFilterData = ProductsData.filter(t => t.ptype === e.target.name);
    setData(typeFilterData);
  };

  const ProductsList = data.slice(0, Skip).map(p => {
    const backStyle = {
      backgroundImage: p.image,
      backgroundPosition: 'top center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    };

    return (
      <li key={p.index}>
        <div className='productItems'>
          <div className='productSample' style={backStyle}>
            <div className='productOverlay'>
              <button className='productDisplayBtn'>{p.pcategory}</button>
              <div className='productItemDetail'>
                <hr className='redLine productLine' />
                <span className='productSeries'>{p.pid}</span>
                <span className='productName'>{p.pname}</span>
              </div>
            </div>
            <div className='productHoverMenu'>
              <div className='productHoverInner'>
                {p.pspace.map((s, index) => {
                  return (
                    <button
                      key={index}
                      onMouseEnter={HoverBg}
                      onMouseLeave={OffHoverBg}
                      className='productHoverBtn'
                      onClick={
                        Status === 'Connected'
                          ? () => handleLevel(p.pscall[index])
                          : null
                      }
                    >
                      View in {s}
                      <div className='arrowHoverBtn'></div>
                    </button>
                  );
                })}

                <button
                  id='prod-modal'
                  className='viewProduct'
                  onClick={() => handlepopup(p.pid)}
                >
                  View Product Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className='productMain'>
      <div className='productContent'>
        <div className='productHeader'>
          <div className='productHeaderContent'>
            <div className='productTitle'>
              <span>
                Products for
                <br /> all your spaces
              </span>
            </div>
            <div className='productParagraph'>
              <span>
              Know what you’re looking for?  Simply check the elements that apply to your search and we’ll help you navigate quickly to the product specs and 3D display that you need.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='productContent2'>
        <div className='productHeader'>
          <div className='productMenuBar'>
            <span className='productTop'>Results Displayed ({length})</span>
            <div className='productType'>
              <span className='productTypeTitle'>Category</span>
              <ul className='sortcategory'>
                {Categories.map((category, index) => {
                  return (
                    <li key={index}>
                      <div className='productList InputChecker'>
                        {/* <div> */}
                        <label className='categoryname'>
                          <input
                            type='radio'
                            id={category.id}
                            name='checked'
                            value={category.name}
                            onChange={e => handleOnChange(e, index)}
                            defaultChecked={category.index === 0}
                          />
                          {category.name}
                          <span className='checkmark'></span>
                        </label>
                        {/* </div> */}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className='producttyperight'>
              <span className='productTypes'>Products Types</span>
              <div className='productList'></div>
              <div className='productListMenu'>
                {finalTypes.map((t, index) => {
                  return Number.isInteger((index + 1) / 4) ? (
                    <button
                      key={index}
                      className='typeitems'
                      name={t}
                      onClick={e => handleTypeFilter(e)}
                    >
                      {t} <div className='productTypeArrow'></div> <br />
                    </button>
                  ) : (
                    <button
                      key={index}
                      className='typeitems'
                      name={t}
                      onClick={e => handleTypeFilter(e)}
                    >
                      {t}
                      <div className='productTypeArrow'></div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='AllProducts'>
        <div className='productContents'>
          <span className='productTitle'>All displays & Monitors</span>
          <ul className='productlist'>{ProductsList}</ul>
          <div>
            <button className='btnStyle loadMore' onClick={onLoadMore}>
              Load More{' '}
            </button>
          </div>
        </div>
      </div>
      {openPopup.active ? (
        <PopUp openPopup={openPopup} closeModal={closeModal} />
      ) : null}
    </div>
  );
};

export default Product;
