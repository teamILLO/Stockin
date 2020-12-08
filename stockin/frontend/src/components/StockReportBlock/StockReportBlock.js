import React from 'react';
import { Segment, Header, Grid, Statistic, Container, List, Loader } from 'semantic-ui-react'
import { history } from '../../store/store';

import GraphComponent from './GraphComponent';


const StockReportBlock = (props) => {
  const title = props.title ? props.title : "";
  const rank = props.rank ? props.rank : "";
  const info = (props.isKOSPI ? 'KOSPI' : 'KOSDAQ') + ' ' + props.code;
  const score = props.score ? props.score : "";
  const price = props.price ? props.price : "0";
  const yesterdayPrice = props.yesterdayPrice ? props.yesterdayPrice : "0";
  const variation = (price + 0) > (yesterdayPrice + 0) ? ("▲" + String(price - yesterdayPrice)) : ("▼" + String(yesterdayPrice - price));
  const news = props.news ? props.news : "";
  const stockhistory = props.stockhistory;

  const rankComponent =
    <Segment inverted color={props.isUp ? 'red' : 'blue'}>
      <Header as='h1'>{rank + '위'}</Header>
    </Segment>

  const titleComponent = 
    <Segment basic>
      <Container textAlign='left'>
        <Header 
          as='h1' 
          style={{color : 'black', cursor:'pointer'}} 
          onClick={() => history.push('/detail/' + props.id)}
        >
          {title}
        </Header>
        <p style={{ color: 'grey' }}>
          {info}<br/>
          현재가 : {price.toLocaleString('en-US', {minimumFractionDigits: 0})}원
          ({variation})
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

  const graphComponent = stockhistory ?
    <GraphComponent
      isUp={props.isUp}
      stockhistory={stockhistory}
    /> :
    <Loader active inline='centered' />

  const newsListComponent = news ? news.map((item) =>
    <List.Item key={item.id}>
      <List.Header as="a" href={item.link}>{item.title}</List.Header>
      <List.Content>{item.press} {item.date}</List.Content>
    </List.Item>
  )  : ""

  const newsComponent =
    <Segment>
      <Header as='h2'>
        주목할만한 뉴스
      </Header>
      <List relaxed>
        {newsListComponent}
      </List>
    </Segment>
  
  return(
    <Segment color={props.isUp ? 'red' : 'blue'} data-testid='StockReportBlock'>
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