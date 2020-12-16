import React from 'react';
import { Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';

import TotalScoreBullet from './TotalScoreBullet';
import CompareBarChart from './CompareBarChart';
import line from '../../../images/line.png';
import { useEffect, useState } from 'react';

const DetailOverview = (props) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [barDataSaleGrowthRate, setbar1] = useState([]);
  const [barDataOperatingMargin, setbar2] = useState([]);
  const [barDataPER, setbar3] = useState([]);

  const scoreScaler = (score) => {
    return ((+score + Math.PI * 3) / Math.PI / 3) * 50;
  };

  const riseAdjective =
    props.stock && props.stock.score >= 80
      ? 'relatively huge'
      : props.stock && props.stock.score >= 60
      ? 'relatively big'
      : props.stock && props.stock.score >= 50
      ? 'standard'
      : props.stock && props.stock.score >= 30
      ? 'relatively small'
      : 'relatively tiny';
  const dropAdjective =
    props.stock && props.stock.score >= 80
      ? 'tiny'
      : props.stock && props.stock.score >= 60
      ? 'small'
      : props.stock && props.stock.score >= 50
      ? 'standard'
      : props.stock && props.stock.score >= 30
      ? 'big'
      : 'huge';
  const stabilityAdjectve =
    props.fs_score && props.fs_score.score && Math.round(scoreScaler(+props.fs_score.score)) >= 80
      ? 'very high'
      : props.fs_score &&
        props.fs_score.score &&
        Math.round(scoreScaler(+props.fs_score.score)) >= 70
      ? 'high'
      : props.fs_score &&
        props.fs_score.score &&
        Math.round(scoreScaler(+props.fs_score.score)) >= 60
      ? 'standard'
      : props.fs_score &&
        props.fs_score.score &&
        Math.round(scoreScaler(+props.fs_score.score)) >= 50
      ? 'low'
      : 'very low';

  useEffect(() => {
    setData([
      {
        id: 'profitability',
        ranges: [0, 30, 50, 60, 80, 100],
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
    setData2([
      {
        id: 'stability',
        ranges: [0, 50, 60, 70, 80, 100],
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
                scoreScaler(props.fs_score.score),
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
                <TotalScoreBullet data={data} color={'reds'} />
              </div>
              <br />
              <br />
              <div style={{ height: '30px' }}>
                <TotalScoreBullet data={data2} color={'blues'} />
              </div>
              <br />
              <h5>
                Profitability Score :{' '}
                {props.stock && props.fs_score && props.fs_score.score
                  ? `${props.stock.score} / 100`
                  : 'Cannot calculate due to lack of data'}
              </h5>
              <h5>
                Stability Score :{' '}
                {props.fs_score
                  ? props.fs_score.score
                    ? `${Math.round(scoreScaler(props.fs_score.score))} / 100`
                    : 'Cannot calculate due to lack of data'
                  : 'Cannot calculate due to lack of data'}
              </h5>
              <Segment raised>
                <h5>Summary</h5>
                <Image as="i" size="mini" src={line} />
                <br />
                <br />
                <p>
                  {props.stock && props.fs_score && props.fs_score.score
                    ? `It is likely to show a ${riseAdjective} rise or a ${dropAdjective} drop when compared to other stocks, and it shows ${stabilityAdjectve} stability.`
                    : 'No summary due to lack of data.'}
                </p>
              </Segment>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Segment>
              <div style={{ height: '300px' }}>
                <h4>Sales Growth Rate</h4>
                <CompareBarChart
                  data={barDataSaleGrowthRate}
                  label={(d) => `${d.value}%`}
                  keys={['This Stock', 'Average of Similar Stocks']}
                  index="Sales Growth Rate"
                />
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <div style={{ height: '300px' }}>
                <h4>PER</h4>
                <CompareBarChart
                  data={barDataPER}
                  label={(d) => `${d.value}`}
                  keys={['This Stock', 'Average of Similar Stocks']}
                  index="PER"
                />
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <div style={{ height: '300px' }}>
                <h4>Operating Margin</h4>
                <CompareBarChart
                  data={barDataOperatingMargin}
                  label={(d) => `${d.value}%`}
                  keys={['This Stock', 'Average of Similar Stocks']}
                  index="Operating Margin"
                />
              </div>
            </Segment>
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
