import React from 'react';
import logo from '../../images/logo.png';
import { Container, Menu, Icon, Image } from 'semantic-ui-react';
import './Footer.css';

const Footer = (props) => {
  // const [search, setSearch] = useState();

  const links = [
    {
      id: 'github',
      href: `https://github.com/swsnu/swpp2020-team15`,
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
      href: 'https://www.instagram.com/stockin_swpp/',
    },
  ];

  const onClickNavHandler = (dest) => {
    props.history.push(dest);
  };

  return (
    <div className="Footer" data-testid="Footer">
      <div className="footerNavBox">
        <Container>
          <Menu secondary compact icon>
            {links.map((item) => (
              <Menu.Item href={item.href} key={item.id}>
                <Icon inverted size="large" name={item.id} />
              </Menu.Item>
            ))}
          </Menu>
        </Container>
        <Container>
          <Menu inverted secondary compact>
            <Menu.Item name="HOME" data-testid="HOME" onClick={() => onClickNavHandler('/main')} />
            <Menu.Item
              name="REPORT"
              data-testid="REPORT"
              onClick={() => onClickNavHandler('/report')}
            />
            <Menu.Item
              name="MY PAGE"
              data-testid="MYPAGE"
              onClick={() => onClickNavHandler('/mypage')}
            />
            <Menu.Item
              name="ABOUT US"
              data-testid="ABOUT US"
              onClick={() => onClickNavHandler('/aboutus')}
            />
          </Menu>
        </Container>
      </div>
      <Image
        data-testid="Logo"
        src={logo}
        onClick={() => onClickNavHandler('/main')}
        centered
        className="footerLogo"
      />
    </div>
  );
};

export default Footer;
