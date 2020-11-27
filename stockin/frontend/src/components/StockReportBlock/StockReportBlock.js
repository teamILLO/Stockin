import React, { useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react'
import { api } from '../../api/index';
import { timeParse } from 'd3-time-format';


const StockReportBlock = (props) => {
  const [title, setTitle] = useState('')
  const [info, setInfo] = useState('')
  const [price, setPrice] = useState('')
  const [variation, setVariation] = useState('')
  const [priceList, setPriceList] = useState('')

  useEffect(()=>{
    api.get('stocks/'+String(props.id)+'/').then((response) => {
      setTitle(response.data['title']);
      setInfo(response.data['isKOSPI']+' '+response.data['code']);
      setPrice(Number(response.data['price']).toLocaleString());
      if(Number(response.data['price'])-Number(response.data['yesterdayPrice']) < 0 )
        setVariation((Number(response.data['yesterdayPrice'])-Number(response.data['price'])).toLocaleString() + '▼')
      else
        setVariation((Number(response.data['price'])-Number(response.data['yesterdayPrice'])).toLocaleString() + '▲')
    }).catch((e) => {console.error(e)});
  }, [props.id]);

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
