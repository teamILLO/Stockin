import React, { useState } from 'react';
import logo from '../../images/logo.png';
import { Container, Menu, Button, Image, Visibility, Search } from 'semantic-ui-react';
import SearchBox from '../SearchBox/SearchBox';
import './Header.css';

const Header = (props) => {
  const [search, setSearch] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const data = [
    { value: 'aaaaa', key: 1234 },
    { value: 'aabdd', key: 1235 },
    { value: 'aacccaa', key: 1236 },
    { value: 'aaewrqaa', key: 1237 },
    { value: 'qerw', key: 1238 },
  ];

  const onClickNavHandler = (dest) => {
    props.history.push(dest);
  };
  const clickLogoutHandler = () => {};
  const handleOnScreen = () => {
    setIsVisible(false);
  };
  const handleOffScreen = () => {
    setIsVisible(true);
  };
  return (
    <div className="Header">
      <Visibility
        continuous
        once
        onBottomVisible={() => handleOnScreen()}
        onBottomPassed={() => handleOffScreen()}
      >
        <Container textAlign="right">
          <Button secondary onClick={() => clickLogoutHandler()}>
            LOGOUT
          </Button>
        </Container>
        <Image
          src={logo}
          onClick={() => onClickNavHandler('/main')}
          centered
          className="headerLogo"
        />
        {/* <div className="searchBox">
          <ReactSearchBox
            placeholder="Search"
            data={data}
            onChange={(value) => setSearch(value)}
            fuseConfigs={{
              threshold: 0.05,
            }}
          />
        </div> */}
        <div>
          <Menu compact secondary>
            <SearchBox />
          </Menu>
        </div>
        <Menu secondary compact size="massive">
          <Menu.Item name="REPORT" onClick={() => onClickNavHandler('/report')} />
          <Menu.Item name="MY PAGE" onClick={() => onClickNavHandler('/mypage')} />
          <Menu.Item name="ABOUT US" onClick={() => onClickNavHandler('/aboutus')} />
        </Menu>
      </Visibility>

      {isVisible && (
        <div className="stickyHeader">
          <Menu borderless fixed="top">
            <Container>
              <Menu.Item name="REPORT">
                <Image
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
                <Menu.Item name="REPORT" onClick={() => onClickNavHandler('/report')} />
                <Menu.Item name="MY PAGE" onClick={() => onClickNavHandler('/mypage')} />
                <Menu.Item>
                  <Button secondary onClick={() => clickLogoutHandler()}>
                    LOGOUT
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default Header;
