import React from 'react';
import logo from '../../images/logo.png';
import { Container, Menu, Button, Icon, Image } from 'semantic-ui-react';
import './Footer.css';

const Footer = (props) => {
  // const [search, setSearch] = useState();

  const links = [
    {
      id: 'github',
      href: `https://www.github.com`,
    },
    {
      id: 'facebook official',
      href: `https://www.facebook.com`,
    },
    {
      id: 'twitter',
      href: `https://twitter.com`,
    },
    {
      id: 'instagram',
      href: `https://www.instagram.com`,
    },
  ];

  const onClickNavHandler = (dest) => {
    props.history.push(dest);
  };

  return (
    <div className="Footer">
      <div className="footerNavBox">
        <Container>
          <Menu secondary compact icon>
            {links.map((item) => (
              <Menu.Item href={item.href}>
                <Icon inverted size="large" name={item.id} />
              </Menu.Item>
            ))}
          </Menu>
        </Container>
        <Container>
          <Menu inverted secondary compact>
            <Menu.Item name="HOME" onClick={() => onClickNavHandler('/main')} />
            <Menu.Item name="REPORT" onClick={() => onClickNavHandler('/report')} />
            <Menu.Item name="MY PAGE" onClick={() => onClickNavHandler('/mypage')} />
            <Menu.Item name="ABOUT US" onClick={() => onClickNavHandler('/aboutus')} />
          </Menu>
        </Container>
      </div>
      <Image
        src={logo}
        onClick={() => onClickNavHandler('/main')}
        centered
        className="footerLogo"
      />
    </div>
  );
};

export default Footer;
