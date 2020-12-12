import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Tab, Button } from 'semantic-ui-react';
import { history } from '../../store/store';
import { getStockHistory } from '../../store/stockHistory/stockHistory';
import { checkLogin } from '../../store/authentication/authentication';
import Header from '../../components/Header/Header';
import DetailData from '../../components/Detail/DetailData/DetailData';
import DetailOverview from '../../components/Detail/DetailOverview/DetailOverview';
import DetailNews from '../../components/Detail/DetailNews/DetailNews';
import DetailPriceTrends from '../../components/Detail/DetailPriceTrends/DetailPriceTrends';
import DetailFinancialState from '../../components/Detail/DetailFinancialState/DetailFinancialState';
import DetailComment from '../../components/Detail/DetailComment/DetailComment';
import Footer from '../../components/Footer/Footer';
import StockInfo from '../../components/StockInfo/StockInfo';
import AddFavoriteModal from '../../components/Modal/AddFavoriteModal/AddFavoriteModal';
import { api } from '../../api';
import './DetailPage.css';

const panes = (id, data, stock, fs_score) => [
  {
    menuItem: { key: 'Overview', className: 'Overview', content: 'Overview' },
    render: () => <DetailOverview id={id} stock={stock} fs_score={fs_score} />,
  },
  {
    menuItem: { key: 'News', className: 'News', content: 'News' },
    render: () => <DetailNews id={id} />,
  },
  {
    menuItem: { key: 'Price Trends', className: 'Price Trends', content: 'Price Trends' },
    render: () => <DetailPriceTrends data={data} />,
  },
  {
    menuItem: { key: 'FinancialState', className: 'FinancialState', content: 'Financial State' },
    render: () => <DetailFinancialState id={id} />,
  },
  {
    menuItem: { key: 'Comments', className: 'Comments', content: 'Comments' },
    render: () => <DetailComment id={id} />,
  },
];

const DetailPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);
  const { priceList } = useSelector((state) => state.stockHistory);
  const [currStock, setCurrStock] = useState();
  const [currFSscore, setCurrFSscore] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    if (loggingIn === undefined) dispatch(checkLogin());
    document.body.style.overflow = 'auto';
  }, []);

  useEffect(() => {
    if (loggingIn === false) {
      history.push('/prelogin');
    }
  }, [loggingIn]);

  useEffect(() => {
    dispatch(getStockHistory(+props.match.params.id));
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    async function getStockInfo() {
      await api.get('stocks/' + props.match.params.id + '/').then((response) => {
        setCurrStock(response.data);
      });
    }
    try {
      getStockInfo();
    } catch (e) {}
  }, [props.match.params.id]);

  useEffect(() => {
    async function getFSscore() {
      await api
        .get('stocks/financialstats/score/' + props.match.params.id + '/')
        .then((response) => setCurrFSscore(response.data));
    }

    try {
      getFSscore();
      //score 객체에는 score와 status가 있음, status가 0이 아니면 score를 도출하지 못한다는 뜻임 'backend/core/views/stocks.py'의 fs_score 참조
    } catch (e) {}
  }, [props.match.params.id]);

  let graph =
    priceList.length === 0 ? (
      'Loading...'
    ) : (
      <DetailData id={props.match.params.id} data={priceList} />
    );

  const onMouseEnter = () => {
    document.body.style.overflow = 'hidden';
  };

  const onMouseLeave = () => {
    document.body.style.overflow = 'auto';
  };

  return (
    <div data-testid="DetailPage">
      <Header history={props.history} />
      <Container>
        <StockInfo id={props.match.params.id} />
        <AddFavoriteModal trigger={<Button content="관심 등록" />} />
        <div
          data-testid="graph"
          className="graph"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {graph}
        </div>

        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes(props.match.params.id, priceList, currStock, currFSscore)}
        />
      </Container>

      <Footer history={props.history} />
    </div>
  );
};

export default DetailPage;
