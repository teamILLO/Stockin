import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import j from '../../images/junhyeok.png';
import w from '../../images/woo0.png';
import g from '../../images/g1.jpg';
import d from '../../images/down.jpg';

const AboutUs = (props) => {
  return (
    <div className="AboutUs" data-testid="AboutUs">
      <br />
      <br />
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Image src={d} size="small" circular centered />
            <h5>Down Lee</h5>
            <a href="https://github.com/DOWN-LEE">Github&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a href="mailto: stockinswpp@gmail.com">Email</a>
          </Grid.Column>
          <Grid.Column>
            <Image src={g} size="small" circular centered />
            <h5>G1 Lee</h5>
            <a href="https://github.com/lgm0905">Github&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a href="mailto: stockinswpp@gmail.com">Email</a>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Image src={j} size="small" circular centered />
            <h5>Junhyeok Park</h5>
            <a href="https://github.com/cheezafizz">Github&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a href="mailto: stockinswpp@gmail.com">Email</a>
          </Grid.Column>
          <Grid.Column>
            <Image src={w} size="small" circular centered />
            <h5>Woo0 Choi</h5>
            <a href="https://github.com/wooong210">Github&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a href="mailto: stockinswpp@gmail.com">Email</a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AboutUs;
