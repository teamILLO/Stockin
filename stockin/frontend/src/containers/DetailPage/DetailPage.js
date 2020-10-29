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

const panes = [
  {
    menuItem: 'Overview',
    render: () => <DetailOverview />,
  },
  {
    menuItem: 'News',
    render: () => <DetailNews />,
  },
  {
    menuItem: 'Price Trends',
    render: () => <DetailPriceTrends />,
  },
  {
    menuItem: 'Financial State',
    render: () => <DetailFinancialState />,
  },
  {
    menuItem: 'Comments',
    render: () => <DetailComment />,
  },
];

const DetailPage = (props) => {
  return (
    <div className="DetailPage">
      <Header history={props.history} />
      <DetailData name={props.name} code={props.code} />
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />

      <Footer history={props.history} />
    </div>
  );
};

export default DetailPage;
