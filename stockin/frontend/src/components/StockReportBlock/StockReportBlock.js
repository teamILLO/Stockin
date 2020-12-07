import React, { useState, useEffect } from 'react';
import { Segment, Header, Grid, Image, Statistic, Container, List } from 'semantic-ui-react'
import { api } from '../../api/index';
import { timeParse } from 'd3-time-format';

import GraphComponent from './GraphComponent';


const StockReportBlock = (props) => {
  const title = props.title;
  const rank = props.rank;
  const info = (props.isKOSPI ? 'KOSPI' : 'KOSDAQ') + ' ' + props.code;
  const score = props.score;
  const price = props.price;
  const variation = (props.price + 0) > (props.yesterdayPrice + 0) ? props.price - props.yesterdayPrice : props.yesterdayPrice - props.price;
  const news = props.news;
  const stockhistory = props.stockhistory;

  const rankComponent =
    <Segment inverted color='red'>
      <Header as='h1'>{rank + '위'}</Header>
    </Segment>

  const titleComponent = 
    <Segment basic>
      <Container textAlign='left'>
        <Header as='h1'>{title}</Header>
        <p style={{ color: 'grey' }}>
          {info}<br/>
          현재가 : 10000원<br/>
          목표가 : 20000원<br/>
        </p>
      </Container>
    </Segment>

  const scoreComponent = 
  <Segment basic>
    <Container>
      <Header as='h1'>Stockin 점수</Header>
      <Statistic horizontal label='점' value={score + '/100'} />
    </Container>
  </Segment>

  const graphComponent = 
    <GraphComponent
      stockhistory={stockhistory}
    />

  const newsListComponent = news.map((item) =>
    <List.Item>
      <List.Header as="a" href={item.link}>{item.title}</List.Header>
      <List.Content>{item.press} {item.date}</List.Content>
    </List.Item>
  )

  const newsComponent = 
  <Segment>
    <Header as='h2'>
      주목할만한 뉴스
    </Header>
    <List relaxed>
      {newsListComponent}
    </List>
  </Segment>

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
          <Grid.Column width={2}>
            {rankComponent}
          </Grid.Column>
          <Grid.Column width={7}>
            {titleComponent}
          </Grid.Column>
          <Grid.Column width={7}>
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