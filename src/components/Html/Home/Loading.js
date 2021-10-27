import React from 'react';


const Loading = () =>{
  return(
    <div className="mainLoading">
      {/* <div className="circle">
        <div className="dot"></div>
        <span>LG DigiTour</span>
      </div> */}
            {/* <div className="circular">
          <div className="inner"></div>
        <div className="number">
        <div className="dot"></div>
              <span>LG DigiTour</span>
        </div>
        <div className="circle">
          <div className="bar left">
            <div className="progress"></div>
          </div>
          <div className="bar right">
            <div className="progress"></div>
          </div>
        </div>
      </div> */}
      <div className="loader">Logo Here...</div>
      <div className="circle logoMain">
        <div className="dot"></div>
        <span>LG DigiTour</span>
      </div>
    </div>
  )
}

export default Loading;