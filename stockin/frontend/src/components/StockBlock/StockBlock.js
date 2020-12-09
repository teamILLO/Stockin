import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import { api } from '../../api/index';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChangingProgressProvider from './ChangeProvider';
import './StockBlock.css';
import { history } from '../../store/store';

const StockBlock = (props) => {
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [price, setPrice] = useState('');
  const [variation, setVariation] = useState('');

  useEffect(() => {
    if (props.id)
      api.get('stocks/' + String(props.id) + '/').then((response) => {
        setTitle(response.data['title']);
        setInfo(response.data['isKOSPI'] + ' ' + response.data['code']);
        setPrice(Number(response.data['price']).toLocaleString());
        if (Number(response.data['price']) - Number(response.data['yesterdayPrice']) < 0)
          setVariation(
            (
              Number(response.data['yesterdayPrice']) - Number(response.data['price'])
            ).toLocaleString() + '▼',
          );
        else
          setVariation(
            (
              Number(response.data['price']) - Number(response.data['yesterdayPrice'])
            ).toLocaleString() + '▲',
          );
      });
  }, [props]);

  const clickCard = () => {
    history.push('/detail/' + props.id);
  };

  const dashname = props.score >= 50 ? 'dashboard' : 'dashboard2';
  const zonename = props.score >= 50 ? 'priceZone' : 'priceZone2';

  return (
    <div data-testid="StockBlock">
      <br />
      <Card className="stockBlock" data-testid="stockBlock" onClick={() => clickCard()}>
        <Card.Header textAlign="left">
          <br />
          <span className="stockTitle">{title}</span>
        </Card.Header>
        <Card.Meta textAlign="left">
          <span className="stockInfo">{info}</span>
        </Card.Meta>
        <Card.Content className="dashboardContent">
          <ChangingProgressProvider values={[0, props.score]}>
            {(value) => (
              <CircularProgressbar
                className={dashname}
                value={value}
                text={props.score}
                circleRatio={0.75}
                styles={buildStyles({
                  rotation: 1 / 2 + 1 / 8,
                  strokeLinecap: 'butt',
                  trailColor: '#eee',
                })}
              />
            )}
          </ChangingProgressProvider>
        </Card.Content>

        <div>
          <Card.Content className={zonename} textAlign="left">
            <span className="stockPrice">{price}</span>
            <span className="variation">{variation}</span>
          </Card.Content>
        </div>
      </Card>
    </div>
  );
};

export default StockBlock;
