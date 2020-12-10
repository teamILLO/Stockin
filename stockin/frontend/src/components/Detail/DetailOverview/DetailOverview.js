import React, { useState, useEffect } from 'react';
import { api } from '../../../api';
import { Grid, Segment } from 'semantic-ui-react';

const DetailOverview = (props) => {
  const [currStock, setCurrStock] = useState();
  const [currFSscore, setCurrFSscore] = useState();
  useEffect(() => {
    if (props.id) {
      api.get('stocks/' + props.id + '/').then((response) => {
        setCurrStock(response.data);
      });
      api.get('stocks/financialstats/score/' + props.id + '/').then((response) => {
        setCurrFSscore(response.data);
        //score 객체에는 score와 status가 있음, status가 0이 아니면 score를 도출하지 못한다는 뜻임 'backend/core/views/stocks.py'의 fs_score 참조
      });
    }
  });
  return (
    <div data-testid="DetailOverview">
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Segment>{'place for graph showing total score'}</Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Segment>{'place for graph showing ML score in some way'}</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>{'place for graph showing FS score in some way'}</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>{'place for graph showing news score in some way'}</Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Segment>{'place for graph comparing saleGrowthRate and saleGrowthRateAvg'}</Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment>{'place for graph comparing operatingMarginRate and ...Avg'}</Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment>{'place for graph comparing crawledPER and ...Avg'}</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default DetailOverview;
