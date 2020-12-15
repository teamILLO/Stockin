import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';

import TotalScoreBullet from './TotalScoreBullet';
import CompareBarChart from './CompareBarChart';
import { useEffect, useState } from 'react';

const DetailOverview = (props) => {
  const [data, setData] = useState([]);
  const [barDataSaleGrowthRate, setbar1] = useState([]);
  const [barDataOperatingMargin, setbar2] = useState([]);
  const [barDataPER, setbar3] = useState([]);
  useEffect(() => {
    setData([
      {
        id: '',
        ranges: [0, 50, 60, 100],
        measures: [],
        markers:
          props.stock && props.fs_score && props.fs_score.score
            ? [
                /*Math.sqrt(
                  (props.stock.score * props.stock.score +
                    ((props.fs_score.score + 8) / 16) *
                      50 *
                      (((props.fs_score.score + 8) / 16) * 50)) /
                    2,
                ),*/
                props.stock.score,
              ]
            : [],
      },
    ]);
    setbar1([
      {
        'Sales Growth Rate': props.stock ? props.stock.title : '',
        'This Stock': props.stock ? props.stock.saleGrowthRate : 0,
      },
      {
        'Sales Growth Rate': 'Average of Similar Stocks',
        'Average of Similar Stocks': props.stock ? props.stock.saleGrowthRateAvg : 0,
      },
    ]);
    setbar2([
      {
        'Operating Margin': props.stock ? props.stock.title : '',
        'This Stock': props.stock ? props.stock.operatingMarginRate : 0,
      },
      {
        'Operating Margin': 'Average of Similar Stocks',
        'Average of Similar Stocks': props.stock ? props.stock.operatingMarginRateAvg : 0,
      },
    ]);
    setbar3([
      {
        PER: props.stock ? props.stock.title : '',
        'This Stock': props.stock ? Number(props.stock.crawledPER) : 0,
      },
      {
        PER: 'Average of Similar Stocks',
        'Average of Similar Stocks': props.stock ? props.stock.crawledPERAvg : 0,
      },
    ]);
  }, [props]);
  // const data = [
  //   {
  //     id: '',
  //     ranges: [0, 50, 60, 100],
  //     measures: [],
  //     markers:
  //       props.stock && props.fs_score && props.fs_score.score
  //         ? [
  //             /*Math.sqrt(
  //               (props.stock.score * props.stock.score +
  //                 ((props.fs_score.score + 8) / 16) *
  //                   50 *
  //                   (((props.fs_score.score + 8) / 16) * 50)) /
  //                 2,
  //             ),*/
  //             props.stock.score,
  //           ]
  //         : [],
  //   },
  // ];
  // const barDataSaleGrowthRate = [
  //   {
  //     'Sales Growth Rate': props.stock && props.stock.title,
  //     'This stock': props.stock && props.stock.saleGrowthRate,
  //   },
  //   {
  //     'Sales Growth Rate': 'Average of Similar Stocks',
  //     'Average of Similar Stocks': props.stock && props.stock.saleGrowthRateAvg,
  //   },
  // ];
  // const barDataOperatingMargin = [
  //   {
  //     'Operating Margin': props.stock && props.stock.title,
  //     'This stock': props.stock && props.stock.operatingMarginRate,
  //   },
  //   {
  //     'Operating Margin': 'Average of Similar Stocks',
  //     'Average of Similar Stocks': props.stock && props.stock.operatingMarginRateAvg,
  //   },
  // ];
  // const barDataPER = [
  //   {
  //     PER: props.stock ? props.stock.title : '',
  //     'This stock': props.stock ? props.stock.crawledPER : 0,
  //   },
  //   {
  //     PER: 'Average of Similar Stocks',
  //     'Average of Similar Stocks': props.stock ? props.stock.crawledPERAvg : 0,
  //   },
  // ];

  return (
    <div data-testid="DetailOverview">
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Header as="h3">Overall Assessment</Header>
              <div style={{ height: '30px' }}>
                <TotalScoreBullet data={data} />
              </div>
              <br />
              <p>
                {
                  /*'This stock is ' + data[0].markers.length
                  ? data[0].markers[0] >= 60 || data[0].markers[0] + ' likely to show a ' + '' + '.'
  : 'not assessable due to lack of data.'*/
                  props.stock && props.stock.score >= 60
                    ? 'It is likely to show a relatively big rise or a small drop'
                    : props.stock && props.stock.score <= 50
                    ? 'It is likely to show a relatively small rise or a big drop'
                    : 'It is likely to show a standard rise or a standard drop'
                }
              </p>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column>
            <div style={{ height: '300px' }}>
              <h4>Sales Growth Rate</h4>
              <CompareBarChart
                data={barDataSaleGrowthRate}
                label={(d) => `${d.value}%`}
                keys={['This Stock', 'Average of Similar Stocks']}
                index="Sales Growth Rate"
              />
            </div>
          </Grid.Column>
          <Grid.Column>
            <div style={{ height: '300px' }}>
              <h4>PER</h4>
              <CompareBarChart
                data={barDataPER}
                label={(d) => `${d.value}`}
                keys={['This Stock', 'Average of Similar Stocks']}
                index="PER"
              />
            </div>
          </Grid.Column>
          <Grid.Column>
            <div style={{ height: '300px' }}>
              <h4>Operating Margin</h4>
              <CompareBarChart
                data={barDataOperatingMargin}
                label={(d) => `${d.value}%`}
                keys={['This Stock', 'Average of Similar Stocks']}
                index="Operating Margin"
              />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
/* This goes to the empty bracket
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
        */

export default DetailOverview;
