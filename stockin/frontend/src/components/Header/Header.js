import React, { useState } from 'react';
import logo from '../../images/logo.png';
import { Container, Menu, Button, Image, Visibility } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import SearchBox from '../SearchBox/SearchBox';
import { tryLogout } from '../../store/authentication/authentication';
import './Header.css';

const Header = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const clickNavHandler = (dest) => {
    props.history.push(dest);
  };

  const clickLogoutHandler = () => {
    dispatch(tryLogout());
  };

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
          <Button secondary onClick={clickLogoutHandler}>
            LOGOUT
          </Button>
        </Container>
        <Image
          src={logo}
          onClick={() => clickNavHandler('/main')}
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
            onClick={() => clickNavHandler('/report')}
          />
          <Menu.Item
            name="MY PAGE"
            data-testid="Mypage"
            onClick={() => clickNavHandler('/mypage')}
          />
          <Menu.Item
            name="ABOUT US"
            data-testid="AboutUs"
            onClick={() => clickNavHandler('/aboutus')}
          />
        </Menu>
      </Visibility>
      <div className={'stickyHeader ' + (isVisible ? '' : 'hidden')} data-testid="StickyHeader">
        <Menu borderless fixed="top">
          <Container>
            <Menu.Item name="REPORT">
              <Image
                data-testid="stickyLogo"
                src={logo}
                onClick={() => clickNavHandler('/main')}
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
                onClick={() => clickNavHandler('/report')}
              />
              <Menu.Item
                name="MY PAGE"
                data-testid="stickyMypage"
                onClick={() => clickNavHandler('/mypage')}
              />
              <Menu.Item>
                <Button secondary onClick={clickLogoutHandler}>
                  LOGOUT
                </Button>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
