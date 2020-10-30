import React from 'react';

const Logo = (props) => {
  return (
    <div className="Logo" data-testid="Logo">
      <img src="../../images/logo.png" onClick={props.onClickLogo}></img>
    </div>
  );
};

export default Logo;
