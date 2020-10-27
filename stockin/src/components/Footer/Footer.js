import React from 'react';
import Logo from '../../images/logo_mini.png';
import iconFacebook from '../../images/icons/facebook.svg';
import iconInstagram from '../../images/icons/instagram.svg';
import iconTwitter from '../../images/icons/twitter.svg';
import './Footer.css';

const Footer = (props) => {
  // const [search, setSearch] = useState();

  const links = [
    {
      id: 'facebook',
      href: `https://www.facebook.com`,
      svg: iconFacebook,
    },
    {
      id: 'instagram',
      href: `https://www.instagram.com`,
      svg: iconInstagram,
    },
    {
      id: 'twitter',
      href: `https://twitter.com`,
      svg: iconTwitter,
    },
  ];

  const onClickNavHandler = (dest) => {
    props.history.push(dest);
  };

  const clickLogoutHandler = () => {};
  return (
    <div className="Footer">
      <div className="footerNavBox">
        <div className="navBar">
          {links.map((item) => (
            <a key={item.id} href={item.href} className="footerSocialStuff">
              <img className="footerSocialIcon" alt={item.id} src={item.svg} />
            </a>
          ))}
        </div>
        <div className="navBar">
          <button className="footerNavStuff" onClick={() => onClickNavHandler('/main')}>
            HOME
          </button>
          <button className="footerNavStuff" onClick={() => onClickNavHandler('/report')}>
            REPORT
          </button>
          <button className="footerNavStuff" onClick={() => onClickNavHandler('/mypage')}>
            MY PAGE
          </button>
          <button className="footerNavStuff" onClick={() => onClickNavHandler('/aboutus')}>
            ABOUT US
          </button>
        </div>
      </div>
      <div className="footerLogoBox">
        <img className="footerLogo" src={Logo} />
      </div>
    </div>
  );
};

export default Footer;
