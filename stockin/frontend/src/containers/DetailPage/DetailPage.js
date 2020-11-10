import React, { useEffect } from 'react';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { useDispatch, useSelector } from 'react-redux';

import { getStockHistory } from '../../store/stockHistory';
import Header from '../../components/Header/Header';
import DetailData from '../../components/Detail/DetailData/DetailData';
import DetailOverview from '../../components/Detail/DetailOverview/DetailOverview';
import DetailNews from '../../components/Detail/DetailNews/DetailNews';
import DetailPriceTrends from '../../components/Detail/DetailPriceTrends/DetailPriceTrends';
import DetailFinancialState from '../../components/Detail/DetailFinancialState/DetailFinancialState';
import DetailComment from '../../components/Detail/DetailComment/DetailComment';
import Footer from '../../components/Footer/Footer';
import { Tab } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../store/store';
import { checkLogin } from '../../store/authentication/authentication';

const panes = (id) => [
  {
    menuItem: { key: 'Overview', className: 'Overview', content: 'Overview' },
    render: () => <DetailOverview />,
  },
  {
    menuItem: { key: 'News', className: 'News', content: 'News' },
    render: () => <DetailNews />,
  },
  {
    menuItem: { key: 'Price Trends', className: 'Price Trends', content: 'Price Trends' },
    render: () => <DetailPriceTrends />,
  },
  {
    menuItem: { key: 'FinancialState', className: 'FinancialState', content: 'Financial State' },
    render: () => <DetailFinancialState />,
  },
  {
    menuItem: { key: 'Comments', className: 'Comments', content: 'Comments' },
    render: () => <DetailComment id={id} />,
  },
];

const DetailPage = (props) => {
  const { loggingIn } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStockHistory(+props.match.params.id));
    if (loggingIn == undefined) dispatch(checkLogin());
    if (loggingIn === false) {
      history.push('/prelogin');
    }
  }, [dispatch, loggingIn]);

  const { priceList } = useSelector((state) => state.stockHistory);
  let graph = priceList.length === 0 ? 'Loading...' : <DetailData data={priceList} />;

  const changeScroll = () => {
    let style = document.body.style.overflow;
    document.body.style.overflow = style === 'hidden' ? 'auto' : 'hidden';
  };

  console.log(priceList);
  return (
    <div data-testid="DetailPage">
      <Header history={props.history} />
      <div onMouseEnter={changeScroll} onMouseLeave={changeScroll}>
        {graph}
      </div>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />

      <Footer history={props.history} />
    </div>
  );
};

export default DetailPage;
