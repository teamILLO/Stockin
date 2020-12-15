import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../store/store';
import { checkLogin } from '../../store/authentication/authentication';
import StockBlock from '../../components/StockBlock/StockBlock';
import { Grid, Icon, Tab, Header as SemanticHeader, Popup, Container } from 'semantic-ui-react';
import { getGroupList } from '../../store/groups/groups';
import { api } from '../../api/index';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './MainPage.css';

var sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  initialSlide: 0,
  arrows: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 706,
      settings: {
        slidesToShow: 2,
        infinite: true,
      },
    },
  ],
};

const MainPage = (props) => {
  const { loggingIn, groupList } = useSelector((state) => ({
    loggingIn: state.authentication.loggingIn,
    groupList: state.groups.groupList,
  }));
  const dispatch = useDispatch();

  const [topStock, setTop] = useState([]);
  const [bottomStock, setBottom] = useState([]);

  useEffect(() => {
    if (loggingIn === undefined) dispatch(checkLogin());
    if (loggingIn === false) {
      history.push('/prelogin');
    }

    api.get('stocks/top10/').then((response) => {
      const stocks = response.data;
      let toplist = [];
      for (var i in stocks) {
        toplist.push({ id: stocks[i]['id'], score: stocks[i]['score'] });
      }
      setTop(toplist);
    });

    api.get('stocks/bottom10/').then((response) => {
      const stocks = response.data;
      let toplist = [];
      for (var i in stocks) {
        toplist.push({ id: stocks[i]['id'], score: stocks[i]['score'] });
      }
      setBottom(toplist);
    });

    dispatch(getGroupList());
  }, [loggingIn]);

  const clickPlease = () => {
    history.push('/mypage');
  };

  const myInterest = () => {
    let stockcount = 0;
    if (groupList.length === 0)
      return (
        <Grid.Row centered>
          <br />
          <br />
          <br />
          <br />
          <Grid.Row centered>
            <Icon.Group
              size="huge"
              data-testid="addGroup"
              onClick={() => clickPlease()}
              style={{ cursor: 'pointer' }}
            >
              <Icon loading size="big" name="circle notch" />
              <Icon name="user x" />
            </Icon.Group>
            <br />
            <h3>Please make your own group!</h3>
            <br /> <br /> <br />
          </Grid.Row>
        </Grid.Row>
      );

    groupList.map((e) => (stockcount += e.stocks.length));

    if (stockcount === 0)
      return (
        <Grid.Row centered>
          <br />
          <br />
          <br />
          <br />
          <Grid.Row centered>
            <Icon.Group
              size="huge"
              data-testid="addStock"
              onClick={() => clickPlease()}
              style={{ cursor: 'pointer' }}
            >
              <Icon loading size="big" name="circle notch" />
              <Icon name="user plus" />
            </Icon.Group>
            <br />
            <h3>Please add stock to your group!</h3>
            <br /> <br /> <br />
          </Grid.Row>
        </Grid.Row>
      );

    return (
      <Grid>
        <Grid.Row centered>
          {groupList.map((e, index) => {
            if (e.stocks.length > 0)
              return (
                <Grid.Column
                  className="interest_tab"
                  width={13}
                  style={{ height: '350px' }}
                  key={index}
                >
                  <Tab panes={panes(e)} />
                </Grid.Column>
              );
          })}
        </Grid.Row>
      </Grid>
    );
  };
  const panes = (e) => {
    return [
      {
        menuItem: e.name,
        render: () => <Tab.Pane>{panes_slider(e)}</Tab.Pane>,
      },
    ];
  };

  const panes_slider = (e) => {
    return (
      <Slider className="interestSlider" {...sliderSettings} draggable={false}>
        {e.stocks.map((stock, index) => {
          return <StockBlock id={stock['id']} score={stock['score']} key={index} />;
        })}
      </Slider>
    );
  };

  const buyPop = (
    <span className="buyPop">
      <Popup trigger={<Icon color="grey" size="large" name="question circle outline" />} wide>
        <h5>
          With the learned AI, micro and macro price predictions are made, scored, and displayed in
          the highest order.
        </h5>
      </Popup>
    </span>
  );

  const sellPop = (
    <span className="sellPop">
      <Popup trigger={<Icon color="grey" size="large" name="question circle outline" />} wide>
        <h5>
          With the learned AI, micro and macro price predictions are made, scored, and displayed in
          the lowest order.
        </h5>
      </Popup>
    </span>
  );

  const mainpane = [
    {
      menuItem: 'DailyReport',
      render: () => (
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={13} style={{ height: '50px' }}>
              <SemanticHeader
                id="up_reco"
                as="h2"
                icon="check"
                content="매수 추천 TOP10"
                style={{ float: 'left' }}
              />
              {buyPop}
            </Grid.Column>
            <Grid.Column width={13} style={{ height: '350px' }}>
              <Slider className="topSlider" {...sliderSettings} draggable={false}>
                {topStock.map((top, index) => {
                  return <StockBlock id={top['id']} score={top['score']} key={index} />;
                })}
              </Slider>
            </Grid.Column>

            <Grid.Column width={13}>
              <SemanticHeader
                id="down_reco"
                as="h2"
                icon="check"
                content="매도 추천 TOP10"
                style={{ float: 'left' }}
              />
              {sellPop}
            </Grid.Column>
            <Grid.Column width={13} style={{ height: '350px' }}>
              <Slider className="topSlider" {...sliderSettings} draggable={false}>
                {bottomStock.map((bottom, index) => {
                  return <StockBlock id={bottom['id']} score={bottom['score']} key={index} />;
                })}
              </Slider>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ),
    },
    { menuItem: 'MyInterests', render: () => myInterest() },
  ];

  return (
    <div data-testid="MainPage">
      <Header history={props.history} />
      <Container>
        <Tab panes={mainpane} />
      </Container>

      <Footer history={props.history} />
    </div>
  );
};

export default MainPage;
