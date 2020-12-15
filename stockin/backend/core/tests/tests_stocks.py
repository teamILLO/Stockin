'''
tests_stocks
'''

from django.test import TestCase, Client
from core.models import Stock, StockHistory, FinancialStat, News


class StocksTestCase(TestCase):
    '''
    StocksTestCase
    '''
    def test_stock_list(self):
        '''
        test_stock_list
        '''
        client = Client(enforce_csrf_checks=True)

        # GET request
        Stock.objects.create(title='foo_title', code='foo_code', sector='foo_sector')

        response = client.get('/api/stocks/')
        self.assertEqual(response.status_code, 200)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)


    def test_stock_fs(self):
        '''
        test_stock_fs
        '''
        client = Client(enforce_csrf_checks=True)

        # GET request
        test_stock = Stock.objects.create(title='foo_title', code='foo_code', sector='foo_sector')
        FinancialStat.objects.create(stock=test_stock,
                                    quarter='foo',
                                    sales='foo',
                                    operatingProfit='foo')

        response = client.get('/api/stocks/financialstats/stock/1/')
        self.assertEqual(response.status_code, 200)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/financialstats/stock/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_price_list(self):
        '''
        test_price_list
        '''
        client = Client(enforce_csrf_checks=True)

        # GET request
        test_stock = Stock.objects.create(title='foo_title', code='foo_code', sector='foo_sector')
        StockHistory.objects.create(stock=test_stock)

        response = client.get('/api/stocks/price/'+str(test_stock.id+1)+'/')
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/stocks/price/'+str(test_stock.id)+'/')
        self.assertEqual(response.status_code, 200)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/price/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_fs_score(self):
        '''
        test_fs_score
        '''
        client = Client(enforce_csrf_checks=True)

        # GET request
        test_stock = Stock.objects.create(title='f', sector='foo_sector', debtRatio='',
                                            crawledPER = '', crawledPERAvg= '',
                                            operatingMarginRate= '', operatingMarginRateAvg = '')
        test_stock_2 = Stock.objects.create(title='f2', sector='goo_sector', debtRatio='',
                                            crawledPER = '', crawledPERAvg = '',
                                            operatingMarginRate='', operatingMarginRateAvg= '')
        FinancialStat.objects.create(stock=test_stock)
        FinancialStat.objects.create(stock=test_stock_2)
        response = client.get('/api/stocks/financialstats/score/'+str(test_stock.id)+'/')
        self.assertEqual(response.status_code, 201)
        response = client.get('/api/stocks/financialstats/score/'+str(test_stock_2.id)+'/')
        self.assertEqual(response.status_code, 201)

        #GET request on invalid stock_id
        response =client.get('/api/stocks/financialstats/score/340/')
        self.assertEqual(response.status_code, 404)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/financialstats/score/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_stock_model(self):
        '''
        test_stock_model
        '''
        test_stock = Stock.objects.create(title='foo_title', code='foo_code', sector='foo_sector')
        self.assertEqual(str(test_stock), 'foo_title')


    def test_stockhistory_model(self):
        '''
        test_stockHistory_model
        '''
        test_stock = Stock.objects.create(title='foo_title', code='foo_code', sector='foo_sector')
        test_stockhistory = StockHistory.objects.create(stock = test_stock, date = '2020-02-02')
        self.assertEqual(str(test_stockhistory), 'foo_title 2020-02-02')


    def test_stock_info(self):
        '''
        test_stock_info
        '''
        client = Client(enforce_csrf_checks=True)
        test_stock1 = Stock.objects.create(title='foo_title1',code='foo_code',sector='foo_sector')
        Stock.objects.create(title='foo_title2', code='foo_code', sector='foo_sector')
        Stock.objects.create(title='foo_title3', code='foo_code', sector='foo_sector')
        Stock.objects.create(title='foo_title4', code='foo_code', sector='foo_sector')
        Stock.objects.create(title='foo_title5', code='foo_code', sector='foo_sector')
        Stock.objects.create(title='foo_title1', code='foo_code', sector='foo_sector')
        Stock.objects.create(title='foo_title2', code='foo_code', sector='foo_sector')
        Stock.objects.create(title='foo_title3', code='foo_code', sector='foo_sector')
        Stock.objects.create(title='foo_title4', code='foo_code', sector='foo_sector')
        Stock.objects.create(title='foo_title5', code='foo_code', sector='foo_sector')
        response = client.get('/api/stocks/'+str(test_stock1.id)+'/')
        self.assertEqual(response.status_code, 203)
        response = client.get('/api/stocks/top10/')
        self.assertEqual(response.status_code, 200)
        response = client.get('/api/stocks/bottom10/')
        self.assertEqual(response.status_code, 200)
        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)


    # Tests stock_top100 views
    # Tests stock_bottom100 views
    def test_stock_report_views(self) :
        '''
        test_stock_report_views
        '''
        client = Client(enforce_csrf_checks=True)
        stock_list = []

        # Create 100 stocks
        for i in range(100) :
            stock_list.append( Stock.objects.create(
                title = 'foo_title',
                code = 'foo_code',
                sector = 'foo_sector',
            ))

        # Create news objects
        for i in range(100) :
            News.objects.create(
                stock = stock_list[i],
                date = '2020-12-07',
                title = 'foo_title',
                press = 'foo_press',
                link = 'foo_link',
            )

        # Create stockhistory objects
        for i in range(100) :
            StockHistory.objects.create(
                stock = stock_list[i],
                date = '2020-12-07',
                endPrice = 100,
            )

        # stock_top100_stockinfo
        response = client.get('/api/stocks/report/up/stockinfo/')
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/report/up/stockinfo/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # stock_top100_news
        response = client.get('/api/stocks/report/up/news/')
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/report/up/news/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # stock_top100_stockhistory
        response = client.get('/api/stocks/report/up/stockhistory/')
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/report/up/stockhistory/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # stock_bottom100_stockinfo
        response = client.get('/api/stocks/report/down/stockinfo/')
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/report/down/stockinfo/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # stock_bottom100_news
        response = client.get('/api/stocks/report/down/news/')
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/report/down/news/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # stock_bottom100_stockhistory
        response = client.get('/api/stocks/report/down/stockhistory/')
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/report/down/stockhistory/',
                    HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
