import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { Tab } from 'semantic-ui-react';

const panes = (id) => [
  {
    menuItem: { key: 'Overview', className: 'Overview', content: 'Overview' },
    render: () => <DetailOverview />,
  },
  {
    menuItem: { key: 'News', className: 'News', content: 'News' },
    render: () => <DetailNews id={id} />,
  },
  {
    menuItem: { key: 'Price Trends', className: 'Price Trends', content: 'Price Trends' },
    render: () => <DetailPriceTrends />,
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

  const dispatch = useDispatch();
  useEffect(() => {
    if (loggingIn === undefined) dispatch(checkLogin());
    if (loggingIn === false) {
      history.push('/prelogin');
    }
    dispatch(getStockHistory(+props.match.params.id));
  }, [dispatch, loggingIn, props.match.params.id]);

  let graph = priceList.length === 0 ? 'Loading...' : <DetailData id={props.match.params.id} data={priceList} />;

  const changeScroll = () => {
    let style = document.body.style.overflow;
    document.body.style.overflow = style === 'hidden' ? 'auto' : 'hidden';
  };

  return (
    <div data-testid="DetailPage">
      <Header history={props.history} />
      <div onMouseEnter={changeScroll} onMouseLeave={changeScroll}>
        {graph}
      </div>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes(props.match.params.id)} />

      <Footer history={props.history} />
    </div>
  );
};

export default DetailPage;
