// social data setup
const title = 'LG Digitour';
const site = 'https://lgdigitour.com/';
const summary =
  'Go hands-on with LG’s latest technology in an interactive 3D virtual environment';
const hastag = 'LGDigitour';

// popup window setup
var left = window.screen.width / 2 - 250;
var top = window.screen.height / 2 - 200;

// export const fbShare = e => {
//   e.preventDefault();

//   FB.ui(
//     {
//       display: 'popup',
//       method: 'share',
//       href: 'https://lgdigitour.com',
//     },
//     function (response) {}
//   );
// };

export const twitterShare = e => {
  e.preventDefault();

  const url = `http://twitter.com/share?text=${summary} at &url=${site}&hashtags=${hastag}`;

  window.open(url, 'MsgWindow', `width=500,height=400,top=${top},left=${left}`);
};

export const linkedinShare = e => {
  e.preventDefault();

  const url = `https://www.linkedin.com/shareArticle?mini=true&url=${site}&title=${title}&summary=${summary}&source=LinkedIn`;

  window.open(url, 'MsgWindow', `width=500,height=400,top=${top},left=${left}`);
};
