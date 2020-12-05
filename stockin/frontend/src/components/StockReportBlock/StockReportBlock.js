import React, { useState, useEffect } from 'react';
import { Segment, Header, Grid, Item, Image, Statistic } from 'semantic-ui-react'
import { api } from '../../api/index';
import { timeParse } from 'd3-time-format';


const StockReportBlock = (props) => {
  const title = props.title;
  const rank = props.rank;
  const info = (props.isKOSPI ? 'KOSPI' : 'KOSDAQ') + ' ' + props.code;
  const score = props.score;
  const price = props.price;
  const variation = (props.price + 0) > (props.yesterdayPrice + 0) ? props.price - props.yesterdayPrice : props.yesterdayPrice - props.price;

  const rankComponent =
    <Segment>
      <Header as='h1' color='red'>{rank + '위'}</Header>
    </Segment>;

  const titleComponent = 
  <Segment>
    <div>
      <Header as='h1'>
        {title}
      </Header>
      <Header as='h1'>
        {info}
      </Header>
      <Header as='h2' color='grey'>
        현재가 : 10000원
      </Header>
    </div>
  </Segment>

  const scoreComponent = 
  <Segment>
    <Statistic horizontal label='점' value={score + '/100'} />
  </Segment>;

  const graphComponent = 
  <Segment>
    <Header as='h1'>
        그래프
      </Header>
    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
  </Segment>;

  const newsComponent = 
  <Segment>
    <div>
      <Header as='h1'>
        주목할만한 뉴스
      </Header>
      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />;
    </div>
  </Segment>;

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
      <Grid divided='vertically'>
        <Grid.Row columns={3}>
          <Grid.Column>
            {rankComponent}
          </Grid.Column>
          <Grid.Column>
            {titleComponent}
          </Grid.Column>
          <Grid.Column>
            {scoreComponent}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column>
            {graphComponent}
          </Grid.Column>
          <Grid.Column>
            {newsComponent}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default StockReportBlock;