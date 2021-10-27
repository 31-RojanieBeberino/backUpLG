import React from "react";

const MobileNav = ()=>{
    const showPages = () => {
        document
          .querySelector('.productMainContainer')
          .classList.add('productActive');
        document.querySelector('.CarouselContainer').classList.add('active');
        document
          .querySelector('.popUpListMain')
          .classList.remove('productListShow');
        document.querySelector('.vnav').classList.add('active');
        document.querySelector('.chatIcon').classList.add('active');
        document.querySelector('.mobileNav').classList.toggle('openMobileNav');
      };
      const showExplore = () => {
        document
          .querySelector('.productMainContainer')
          .classList.add('productActive');
          document
          .querySelector('.popUpListMain')
          .classList.remove('productListHide');
        // document.querySelector('.CarouselContainer').classList.add('active');
        document.querySelector('.popUpListMain').classList.add('productListShow');
        document.querySelector('.chatIcon').classList.remove('active');
        document.querySelector('.vnav').classList.remove('active');
        document.querySelector('.Enav').classList.remove('EnavActive');
        document.querySelector('.mobileNav').classList.toggle('openMobileNav')
      };
      const showSpaces = () => {
        document
          .querySelector('.productMainContainer')
          .classList.remove('productActive');
        document.querySelector('.CarouselContainer').classList.remove('active');
        document.querySelector('.vnav').classList.remove('active');
        document.querySelector('.vnav').style.zIndex = '20';
        document
          .querySelector('.popUpListMain')
          .classList.remove('productListShow');
        document.querySelector('.VlandingMAin').classList.remove('active');
        document.querySelector('.Enav').classList.remove('EnavActive');
        document.querySelector('.mobileNav').classList.toggle('openMobileNav')
      };


      const menu = [
        {
          index: 1,
          list: (
            <button onClick={showSpaces} className='spaces'>
              Spaces
            </button>
          ),
        },
        {
          index: 2,
          list: (
            <button onClick={showPages} className='product'>
              Product
            </button>
          ),
        },
        {
          index: 3,
          list: (
            <button onClick={ showExplore } className='explore'>
              Explore
            </button>
          ),  
        },
      ];

    return(
        <div className="mobileNav">
            <ul>
                {menu.map(l => {
                return <li key={l.index}>{l.list}</li>;
            })}
            </ul>
        </div>
    )

}

export default MobileNav;