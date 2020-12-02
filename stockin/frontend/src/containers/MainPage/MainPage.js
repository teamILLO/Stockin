import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../store/store';
import { checkLogin } from '../../store/authentication/authentication';
import StockBlock from '../../components/StockBlock/StockBlock';
import { Grid, Container } from 'semantic-ui-react';
import { api } from '../../api/index';

const MainPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const [top1, setTop1] = useState()
  const [top2, setTop2] = useState()
  const [top3, setTop3] = useState()
  const [top4, setTop4] = useState()
  const [top5, setTop5] = useState()
  const [score1, sets1] = useState()
  const [score2, sets2] = useState()
  const [score3, sets3] = useState()
  const [score4, sets4] = useState()
  const [score5, sets5] = useState()

  useEffect(() => {
    if (loggingIn === undefined) dispatch(checkLogin());
    if (loggingIn === false) {
      history.push('/prelogin');
    }

    api.get('stocks/top5/').then((response)=>{
      const stocks=response.data;

      setTop1(stocks[0]['id'])
      sets1(stocks[0]['score'])
      setTop2(stocks[1]['id'])
      sets2(stocks[1]['score'])
      setTop3(stocks[2]['id'])
      sets3(stocks[2]['score'])
      setTop4(stocks[3]['id'])
      sets4(stocks[3]['score'])
      setTop5(stocks[4]['id'])
      sets5(stocks[4]['score'])
      
      
    })


  }, [dispatch, loggingIn]);

  return (
    <div data-testid="MainPage">
      <Header history={props.history} />
      <Container>
          <Grid>
            
            <StockBlock id={top1} score ={score1}/>
            <StockBlock id={top2} score ={score2}/>
            <StockBlock id={top3} score ={score3}/>
            <StockBlock id={top4} score ={score4}/>
            <StockBlock id={top5} score ={score5}/>
            
            
          </Grid>
    </Container>        
      <Footer history={props.history} />
    </div>
  );
};

export default MainPage;
