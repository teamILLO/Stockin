import { api } from '../../api/index';
import increment, {UpdateIncrement, updateIncrement} from './increment';
import store from '../store';

const testIncrement = 1;

describe('increment', () => {
    beforeEach(() => {
      console.error = jest.fn();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
      console.error.mockClear();
    });
  
    it('should handle initial state', () => {
      expect(increment(undefined, {})).toEqual({
        increment : 0
      });
    });
  
    it('should handle updateIncrement', () => {
      expect(
        increment(
            {
                increment : 0,
            },
            {
                type: UpdateIncrement.type,
            }
        )
      ).toEqual({
        increment : 1,
      });
    });
  
    it(`should work when 'updateIncrement' calls`, (done) => {
      store.dispatch(updateIncrement()).then(() => {
        done();
      });
    });
});
  