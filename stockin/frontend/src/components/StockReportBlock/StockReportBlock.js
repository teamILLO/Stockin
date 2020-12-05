import React, { useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react'
import { api } from '../../api/index';
import { timeParse } from 'd3-time-format';


const StockReportBlock = (props) => {
  const title = props.title;
  const rank = props.rank;
  const info = (props.isKOSPI ? 'KOSPI' : 'KOSDAQ') + ' ' + props.code;
  const price = props.price;
  const variation = (props.price + 0) > (props.yesterdayPrice + 0) ? props.price - props.yesterdayPrice : props.yesterdayPrice - props.price;

  /* TODO : FOR GRAPH */
  //const priceList

  // useEffect(() => {
  //   api.get('/stocks/price/' + props.id + '/').then((response) => {
  //       let parseDate = timeParse('%Y-%m-%d');
  //       let prices = response.data
  //       prices.forEach((d) => {
  //           d.date = parseDate(d.date);
  //           d.open = +d.open;
  //           d.high = +d.high;
  //           d.low = +d.low;
  //           d.close = +d.close;
  //       });
  //       setPriceList(prices);
  //     }).catch((e) => {console.log(e)});
  // }, [props.id]);
  
  // let graph = priceList  === '' ? 'Loading...' : <DetailData data={priceList} />;

  return(
    <Segment color='red' data-testid='StockReportBlock'>
        <div>rank: {props.rank}</div> 
        <div>{title}</div>
        <div>{info}</div>
        <div>{price} {variation}</div>
        {/* {graph} */}
        
    </Segment>

   
  );
};

export default StockReportBlock;
