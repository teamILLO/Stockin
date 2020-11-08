import os,sys
import django
import requests
from bs4 import BeautifulSoup
import datetime
from multiprocessing import Pool, Process



BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(BASE_DIR)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stockin.settings')
django.setup()

from apps.news.models import News
from apps.stocks.models import Stock




url = 'https://search.naver.com/search.naver?&where=news&query={}&sm=tab_pge&sort=2&photo=0&field=1&reporter_article=&pd=3&ds={}&de={}&docid=&nso=so:dd,a:all&mynews=0&start={}&refresh_start=0'
headers={'User-Agent': 'Mozilla/5.0'}



def NewsCrawler_(stock, startDate, endDate):
    
    stockTitle = stock.title
    newsCount = 1
    oneDay = datetime.timedelta(days=1)
    dateIndex = startDate
    news_list=[]
    
    while dateIndex <= endDate:

        while True:
            date = dateIndex.strftime('%Y.%m.%d')
            raw = requests.get(url.format(stockTitle, date, date, newsCount), headers=headers)
            soup= BeautifulSoup(raw.text, 'html.parser')

            titles = soup.select('.news_tit')
            presses = soup.select('.info.press')
            
            for title, press in zip(titles, presses):
                
                # print(dateIndex.strftime('%Y-%m-%d'),stockTitle, press.text.split(' ')[0])
                news_list.append(
                    News(
                    stock=stock,
                    title=title.text,
                    press=press.text.split(' ')[0],
                    date=dateIndex.strftime('%Y-%m-%d'),
                    link=title['href']
                    )
                )
                
                
               

            if len(titles) < 10:
                break

            newsCount += 10

        print(dateIndex, stockTitle)
        dateIndex += oneDay
        newsCount = 1
        
    if len(news_list) != 0:
        News.objects.bulk_create(news_list)
        
def NewsCrawler(startDate, endDate, process=32):

    stocks = Stock.objects.all()
      
    pool = Pool(process)
    
    try:
        for stock in stocks:
            pool.apply_async(NewsCrawler_, args=(stock,startDate,endDate))
    finally:
        pool.close()
        pool.join()




a=datetime.date(2020,11,7)
b=datetime.date(2020,11,1)


NewsCrawler(b,a)
if __name__ == '__main__':
    pass