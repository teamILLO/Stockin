import React, { useState } from 'react';
import Logo from '../../images/logo.png';
import LogoMini from '../../images/logo_mini.png';
import ReactSearchBox from 'react-search-box';
import './Header.css';

const Header = (props) => {
  // const [search, setSearch] = useState();
  const onClickNavHandler = (dest) => {
    props.history.push(dest);
  };

  const clickLogoutHandler = () => {};
  return (
    <div className="Header">
      <button className="logoutButton" onClick={clickLogoutHandler}>
        LOGOUT
      </button>
      <img className="logo" src={Logo} />
      <div className="searchBox">
        <ReactSearchBox />
      </div>
      <div className="navBar">
        <button className="navStuff" onClick={() => onClickNavHandler('/report')}>
          REPORT
        </button>
        <button className="navStuff" onClick={() => onClickNavHandler('/mypage')}>
          MY PAGE
        </button>
        <button className="navStuff" onClick={() => onClickNavHandler('/aboutus')}>
          ABOUT US
        </button>
      </div>
    </div>
  );
  // return (
  //   <div className="HeaderMini">
  //     <img className="logoMini" src={LogoMini} />
  //     <div className="navBar">
  //       <button className="navStuff" onClick={() => onClickNavHandler('/report')}>
  //         REPORT
  //       </button>
  //       <button className="navStuff" onClick={() => onClickNavHandler('/mypage')}>
  //         MY PAGE
  //       </button>
  //       <button className="navStuff" onClick={() => clickLogoutHandler()}>
  //         LOGOUT
  //       </button>
  //     </div>
  //   </div>
  // );
};

export default Header;
