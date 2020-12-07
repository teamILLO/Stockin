import React, { PureComponent } from 'react';
import { Segment, Header, Grid, Image, Statistic, Container, List } from 'semantic-ui-react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import { extent as d3Extent, max as d3Max } from 'd3-array';
import { scaleLinear as d3ScaleLinear, scaleTime as d3ScaleTime} from 'd3-scale';
import { format as d3Format } from 'd3-format';

const GraphComponent = (props) => {
    const stockhistory = props.stockhistory;

    return (
        <LineChart
          width={500}
          height={300}
          data={stockhistory}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="endPrice" stroke="#8884d8" />
        </LineChart>
      );
}

export default GraphComponent;