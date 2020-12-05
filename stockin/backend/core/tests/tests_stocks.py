from django.test import TestCase, Client
from core.models import Stock, StockHistory, FinancialStat
import json

class StocksTestCase(TestCase):
    def test_stock_list(self):
        client = Client(enforce_csrf_checks=True)

        # GET request
        test_stock = Stock.objects.create(title='foo_title', code='foo_code', sector='foo_sector')

        response = client.get('/api/stocks/')
        self.assertEqual(response.status_code, 200)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)


    def test_stock_fs(self):
        client = Client(enforce_csrf_checks=True)

        # GET request
        test_stock = Stock.objects.create(title='foo_title', code='foo_code', sector='foo_sector')
        test_fs = FinancialStat.objects.create(stock=test_stock, quarter='foo', sales='foo', operatingProfit='foo')

        response = client.get('/api/stocks/financialstats/stock/1/')
        self.assertEqual(response.status_code, 200)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/financialstats/stock/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_price_list(self):
        client = Client(enforce_csrf_checks=True)

        # GET request
        test_stock = Stock.objects.create(title='foo_title', code='foo_code', sector='foo_sector')
        test_stockHistory = StockHistory.objects.create(stock=test_stock)

        response = client.get('/api/stocks/price/2/')
        self.assertEqual(response.status_code, 404)

        response = client.get('/api/stocks/price/1/')
        self.assertEqual(response.status_code, 200)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/price/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_stock_model(self):
        test_stock = Stock.objects.create(title='foo_title', code='foo_code', sector='foo_sector')
        self.assertEqual(str(test_stock), 'foo_title')
    

    def test_stockHistory_model(self):
        test_stock = Stock.objects.create(title='foo_title', code='foo_code', sector='foo_sector')
        test_stockHistory = StockHistory.objects.create(stock = test_stock, date = '2020-02-02')
        self.assertEqual(str(test_stockHistory), 'foo_title 2020-02-02')
    

    def test_stock_info(self):
        client = Client(enforce_csrf_checks=True)
        test_stock1 = Stock.objects.create(title='foo_title1', isKOSPI = True, code='foo_code', price=1, yesterdayPrice = 1, sector='foo_sector', score = 1)
        test_stock2 = Stock.objects.create(title='foo_title2', isKOSPI = True, code='foo_code', price=2, yesterdayPrice = 1, sector='foo_sector', score = 2)
        test_stock3 = Stock.objects.create(title='foo_title3', isKOSPI = True, code='foo_code', price=3, yesterdayPrice = 1, sector='foo_sector', score = 3)
        test_stock4 = Stock.objects.create(title='foo_title4', isKOSPI = True, code='foo_code', price=4, yesterdayPrice = 1, sector='foo_sector', score = 4)
        test_stock5 = Stock.objects.create(title='foo_title5', isKOSPI = True, code='foo_code', price=5, yesterdayPrice = 1, sector='foo_sector', score = 5)
        response = client.get('/api/stocks/1/')
        self.assertEqual(response.status_code, 203)
        response = client.get('/api/stocks/top5/')
        self.assertEqual(response.status_code, 200)
        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/1/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/top5/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        

    def test_stock_get_10_each(self):
        client = Client(enforce_csrf_checks=True)
        test_stock1 = Stock.objects.create(title='foo_title1', isKOSPI = True, code='foo_code', price=1, yesterdayPrice = 1, sector='foo_sector', score = 1)
        test_stock2 = Stock.objects.create(title='foo_title2', isKOSPI = True, code='foo_code', price=2, yesterdayPrice = 1, sector='foo_sector', score = 2)
        test_stock3 = Stock.objects.create(title='foo_title3', isKOSPI = True, code='foo_code', price=3, yesterdayPrice = 1, sector='foo_sector', score = 3)
        test_stock4 = Stock.objects.create(title='foo_title4', isKOSPI = True, code='foo_code', price=4, yesterdayPrice = 1, sector='foo_sector', score = 4)
        test_stock5 = Stock.objects.create(title='foo_title5', isKOSPI = True, code='foo_code', price=5, yesterdayPrice = 1, sector='foo_sector', score = 5)
        response = client.get('/api/stocks/scrolldata/0/')
        self.assertEqual(response.status_code, 200)
        response = client.get('/api/stocks/scrolldata/3/')
        self.assertEqual(response.status_code, 200)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/stocks/scrolldata/3/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)


        
        



        





        
