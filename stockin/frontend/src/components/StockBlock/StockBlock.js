import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react'
import { api } from '../../api/index';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChangingProgressProvider from "./ChangeProvider";
import './StockBlock.css';



const StockBlock = (props) => {
  const [title, setTitle] = useState('')
  const [info, setInfo] = useState('')
  const [price, setPrice] = useState('')
  const [variation, setVariation] = useState('')
  const [BuyorSell, setBuyorSell] = useState('Buy!')

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
  

  return(
  <div data-testid="StockBlock">
    <Card className='stockBlock'>
      <Card.Header textAlign='left'>
        <br/>
        <span className='stockTitle'>{title}</span>
        
      </Card.Header>
      <Card.Meta textAlign='left'>
      <span className='stockInfo'>{info}</span>
      </Card.Meta>
      <Card.Content centered="true" className='dashboardContent'>
      <ChangingProgressProvider values={[0, 80]}>
        {value => (
          <CircularProgressbar
            className='dashboard'
            value={value}
            text={BuyorSell}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: "butt",
              trailColor: "#eee"  
            })}
          />
        )}
      </ChangingProgressProvider>
      </Card.Content>

      <div>
      <Card.Content  className='priceZone' textAlign='left'>
        <span className='stockPrice'>{price}</span>
        <span className='variation'>{variation}</span>
      </Card.Content>
      </div>
      
    </Card>
  </div>
  );
};

export default StockBlock;
