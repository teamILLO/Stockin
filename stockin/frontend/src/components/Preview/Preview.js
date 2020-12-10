import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import my from '../../images/preview_mypage.png';
import main from '../../images/preview_mainpage.png';

const Preview = (props) => {
  return (
    <div data-testid="Preview">
      <br />
      <Grid>
        <Header as="h4">Efficiently ordered stocks</Header>
        <Image src={main} size="large" centered />
        <Header as="h4">Comparison by groups</Header>
        <Image src={my} size="large" centered />
      </Grid>
    </div>
  );
};

export default Preview;
