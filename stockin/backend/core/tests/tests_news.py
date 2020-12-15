'''
tests_news
'''
from django.test import TestCase, Client
from core.models import News, Stock

class NewsTestCase(TestCase):
    '''
    NewsTestCase
    '''
    def test_get_news_list(self):
        '''
        test_get_news_list
        '''
        client = Client(enforce_csrf_checks=True)

        # GET request
        test_stock = Stock.objects.create(title='foo_title', code='foo_code', sector='foo_sector')
        News.objects.create(stock=test_stock, title='foo',
                            press='foo', link='foo', date='2020-11-11')

        response = client.get('/api/news/stocks/1/date/2020/')
        self.assertEqual(response.status_code, 400)

        response = client.get('/api/news/stocks/1/date/20201111/')
        self.assertEqual(response.status_code, 200)

        # HttpResponseNotAllowed tests
        response = client.get('/api/users/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete('/api/news/stocks/1/date/20201111/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
