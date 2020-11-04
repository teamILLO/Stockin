import React from 'react';
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
  return (
    <div data-testid="DetailPage">
      <Header history={props.history} />
      <DetailData name={props.name} code={props.code} />
      <Tab menu={{ secondary: true, pointing: true }} panes={panes(props.match.params.id)} />

      <Footer history={props.history} />
    </div>
  );
};

export default DetailPage;
