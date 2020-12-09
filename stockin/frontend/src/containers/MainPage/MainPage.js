import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../store/store';
import { checkLogin } from '../../store/authentication/authentication';
import StockBlock from '../../components/StockBlock/StockBlock';
import { Grid, Icon, Tab } from 'semantic-ui-react';
import { getGroupList } from '../../store/groups/groups';
import { api } from '../../api/index';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './MainPage.css';

var sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  initialSlide: 0,
  arrows: true,
};

const MainPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const [topStock, setTop] = useState([]);
  const [bottomStock, setBottom] = useState([]);
  const { groupList } = useSelector((state) => state.groups);

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
    console.log(groupList)
  }, [loggingIn]);



  const myInterest = () => {
    let stockcount=0
    if (groupList.length == 0)
      return(
        <Grid.Row centered>
          <Grid.Row centered>
            <Icon.Group size='massive'>
              <Icon loading size='big' name='circle notch' />
              <Icon name='user x'/>
            </Icon.Group>
            <h1>Please make your own group!</h1>
          </Grid.Row>
        </Grid.Row>
      )
    
    groupList.map((e)=>{
      stockcount += e.stocks.length
    })

    if(stockcount==0)
      return(
        <Grid.Row centered>
          <Grid.Row centered>
            <Icon.Group size='massive'>
              <Icon loading size='big' name='circle notch' />
              <Icon name='user plus' />
            </Icon.Group>
            <h1>Please add stock to your group!</h1>
          </Grid.Row>
        </Grid.Row>
      );
    
    return(
      <Grid>
      <Grid.Row centered>
      {groupList.map((e, index)=>{
        if(e.stocks.length > 0 )
          return(
           
               
            <Grid.Column className='interest_tab' width={13} style={{ height: '350px' }} key={index}>
              <Tab  panes={panes(e)}/>
            </Grid.Column>
  
          )
      })}
     </Grid.Row>
     </Grid>
    )
  }
  const panes =(e) => {
    return [{
      menuItem: e.name,
      render: () =>
      <Tab.Pane>
        {panes_slider(e)}
      </Tab.Pane> 
    }]
  }

  const panes_slider = (e) =>{
    return(
      <Slider className="interestSlider" {...sliderSettings} draggable={false}>
        {e.stocks.map((stock, index) => {
          return <StockBlock id={stock['id']} score={stock['score']} key={index} />;
        })}
      </Slider>
    )
  }


  const mainpane = [
    {menuItem: 'DailyReport', render: ()=>
    <Grid>
    <Grid.Row centered>
    <Grid.Column width={13} style={{ height: '350px' }}>
      <Slider className="topSlider" {...sliderSettings} draggable={false}>
        {topStock.map((top, index) => {
          return <StockBlock id={top['id']} score={top['score']} key={index} />;
        })}
      </Slider>
    </Grid.Column>

    <Grid.Column width={13} style={{ height: '350px' }}>
      <Slider className="topSlider" {...sliderSettings} draggable={false}>
        {bottomStock.map((bottom, index) => {
          return <StockBlock id={bottom['id']} score={bottom['score']} key={index} />;
        })}
      </Slider>
    </Grid.Column>
  </Grid.Row>
  </Grid>},
  {menuItem: 'MyInterests', render: ()=>myInterest()}

  ]

  return (
    <div data-testid="MainPage">
      <Header history={props.history} />

      <Tab panes={mainpane}/>
      
      <Footer history={props.history} />
    </div>
  );
};

export default MainPage;
