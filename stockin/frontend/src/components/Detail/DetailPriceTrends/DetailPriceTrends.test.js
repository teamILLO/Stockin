import DetailPriceTrends from './DetailPriceTrends';
import { Provider } from 'react-redux';
import {
    render,
    screen,
} from '@testing-library/react';


describe('<DetailPriceTrends />', () => {
    let detail;

    beforeEach(() => {
        detail = (        
            <DetailPriceTrends history={history} />
        );
    });

    it('it should render without errors', () => {
        render(detail);
        const query = screen.queryAllByText(/DetailPriceTrends/i);
        expect(query.length).toBe(1);
    })


});