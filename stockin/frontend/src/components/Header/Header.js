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

  const onClickNavHandler = (dest) => {
    props.history.push(dest);
  };

  const onClickLogoutHandler = () => {
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
      
        <Container textAlign="right">
          <Button secondary onClick={onClickLogoutHandler}>
            LOGOUT
          </Button>
        </Container>
        <Image
          src={logo}
          onClick={() => onClickNavHandler('/main')}
          centered
          className="headerLogo"
          data-testid="Logo"
          style={{cursor: 'pointer'}}
        />
        <div>
          <Menu compact secondary>
            <SearchBox />
          </Menu>
          <Visibility
            continuous
            once
            onBottomVisible={() => handleOnScreen()}
            onBottomPassed={() => handleOffScreen()}
          ></Visibility>
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
      <div className={'stickyHeader ' + (isVisible ? '' : 'hidden')} data-testid="StickyHeader">
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
                <Button secondary onClick={onClickLogoutHandler}>
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
