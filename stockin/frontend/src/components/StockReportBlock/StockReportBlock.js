import React, { useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react'
import { api } from '../../api/index';
import DetailData from '../../components/Detail/DetailData/DetailData';


const StockReportBlock = (props) => {
  const [title, setTitle] = useState('')
  const [info, setInfo] = useState('')
  const [price, setPrice] = useState('')
  const [variation, setVariation] = useState('')
  const [BuyorSell, setBuyorSell] = useState('Buy!')
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
    });
  });
  
  let graph = priceList.length === 0 ? 'Loading...' : <DetailData data={priceList} />;

  return(
    <Segment color='red'>
        <div>rank: {props.rank}</div> 
        <div>{title}</div>
        <div>{info}</div>
        <div>{price} {variation}</div>
        {graph}
        
    </Segment>

   
  );
};

export default StockReportBlock;
