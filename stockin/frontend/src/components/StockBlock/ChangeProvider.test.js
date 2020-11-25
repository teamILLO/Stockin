import React from 'react';
import { render } from '@testing-library/react';
import ChangingProgressProvider from './ChangeProvider';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

describe('<ChangeProvider />', () => {
  let spyPost;
  beforeEach(() => {
    spyPost = (
        <ChangingProgressProvider values={[0, 80]}>
        {value => (
          <CircularProgressbar
            className='dashboard'
            value={value}
            text={'Buy!'}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: "butt",
              trailColor: "#eee"  
            })}
          />
        )}
      </ChangingProgressProvider>
    )
  });

  it('should render without errors', async () => {
    const sleep = seconds => new Promise(res => setTimeout(() => res(), seconds * 1000));
    render(spyPost);
    await sleep(2)
  });

});
