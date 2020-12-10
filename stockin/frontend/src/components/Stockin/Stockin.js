import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';

const Stockin = (props) => {
  return (
    <div data-testid="Stockin">
      <Grid>
        <Container text textAlign="left">
          <p />
          <Header as="h2">What is STOCKIN?</Header>
          <p />
          <p>
            STOCKIN helps beginners in stock trading by providing well-organized, only essential
            information to them. <br /> <br />
            With STOCKIN, you can make a reasonable decision on your own without spending so much
            time comparing among tremendous amount of data.
          </p>
          <br />
          <Header as="h2">Features</Header>
          <p />
          <p>
            <b>Efficiently sorted stocks</b>
            <br />
            <br />
            Stocks are sorted in likely-to-fall or likely-to-rise order.
            <br />
            Stop wasting your time searching what to look at.
            <br />
            <br />
            <b>User custom groups</b>
            <br />
            <br />
            You can compare stocks by creating your own group.
            <br />
            You can even compare data between groups.
          </p>
          <br />
          <Header as="h2">....and much more!</Header>
        </Container>
      </Grid>
    </div>
  );
};

export default Stockin;
