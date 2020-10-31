import React, { useState } from 'react';
import logo from '../../images/logo.png';
import { Container, Menu, Button, Image, Visibility, Search } from 'semantic-ui-react';
import SearchBox from '../SearchBox/SearchBox';
import './Header.css';

const Header = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const onClickNavHandler = (dest) => {
    props.history.push(dest);
  };
  // const clickLogoutHandler = () => {};
  const handleOnScreen = () => {
    setIsVisible(false);
  };
  const handleOffScreen = () => {
    setIsVisible(true);
  };
  return (
    <div className="Header" data-testid="Header">
      <Visibility
        continuous
        once
        onBottomVisible={() => handleOnScreen()}
        onBottomPassed={() => handleOffScreen()}
      >
        <Container textAlign="right">
          <Button secondary>LOGOUT</Button>
        </Container>
        <Image
          src={logo}
          onClick={() => onClickNavHandler('/main')}
          centered
          className="headerLogo"
          data-testid="Logo"
        />
        <div>
          <Menu compact secondary>
            <SearchBox />
          </Menu>
        </div>
        <Menu secondary compact size="massive">
          <Menu.Item
            name="REPORT"
            data-testid="Report"
            onClick={() => onClickNavHandler('/report')}
          />
          <Menu.Item
            name="MY PAGE"
            data-testid="Mypage"
            onClick={() => onClickNavHandler('/mypage')}
          />
          <Menu.Item
            name="ABOUT US"
            data-testid="AboutUs"
            onClick={() => onClickNavHandler('/aboutus')}
          />
        </Menu>
      </Visibility>

      <div className={'stickyHeader ' + (isVisible ? '' : 'invisible')} data-testid="StickyHeader">
        <Menu borderless fixed="top">
          <Container>
            <Menu.Item name="REPORT">
              <Image
                data-testid="stickyLogo"
                src={logo}
                onClick={() => onClickNavHandler('/main')}
                centered
                className="headerSmallLogo"
              />
            </Menu.Item>
            <Menu.Menu position="right" widths="4">
              <Menu.Item>
                <SearchBox />
              </Menu.Item>
              <Menu.Item
                name="REPORT"
                data-testid="stickyReport"
                onClick={() => onClickNavHandler('/report')}
              />
              <Menu.Item
                name="MY PAGE"
                data-testid="stickyMypage"
                onClick={() => onClickNavHandler('/mypage')}
              />
              <Menu.Item>
                <Button secondary>LOGOUT</Button>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
