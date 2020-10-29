import React from 'react';
import Header from '../../components/Header/Header';
import DetailData from '../../components/Detail/DetailData/DetailData';
import DetailOverview from '../../components/Detail/DetailOverview/DetailOverview';
import DetailNews from '../../components/Detail/DetailNews/DetailNews';
import DetailPriceTrends from '../../components/Detail/DetailPriceTrends/DetailPriceTrends';
import DetailFinancialState from '../../components/Detail/DetailFinancialState/DetailFinancialState';
import DetailComment from '../../components/Detail/DetailComment/DetailComment';
import Footer from '../../components/Footer/Footer';

const DetailPage = (props) => {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let currentTab = 'dddd';
  switch (value) {
    case 0:
      currentTab = <DetailOverview />;
      break;
    case 1:
      currentTab = <DetailNews />;
      break;
    case 2:
      currentTab = <DetailPriceTrends />;
      break;
    case 3:
      currentTab = <DetailFinancialState />;
      break;
    case 4:
      currentTab = <DetailComment />;
      break;

    default:
      break;
  }

  return (
    <div className="DetailPage">
      <Header history={props.history} />
      <DetailData name={props.name} code={props.code} />
      {/* <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        centered
      >
        <Tab label="Overview" />
        <Tab label="News" />
        <Tab label="Price Trends" />
        <Tab label="Financial state" />
        <Tab label="Comments" />
      </Tabs> */}
      {currentTab}
      <Footer history={props.history} />
    </div>
  );
};

export default DetailPage;
