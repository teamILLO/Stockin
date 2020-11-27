import os,sys
import django
import requests
from bs4 import BeautifulSoup
import datetime
from multiprocessing import Pool, Process
from selenium import webdriver
import csv


import time

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
print(BASE_DIR)
sys.path.append(BASE_DIR)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stockin.settings')
django.setup()

from core.models import Stock, FinancialStat, News


def FSCrawler():
    # driver = webdriver.PhantomJS(os.path.join(BASE_DIR, 'core/crawlers/phantomjs/phantomjs-2.1.1-linux-x86_64/bin/phantomjs'))
    driver = webdriver.PhantomJS(os.path.join(BASE_DIR, 'core/crawlers/phantomjs/phantomjs-2.1.1-macosx/bin/phantomjs')) 
    driver.implicitly_wait(3)
    
    stocks = Stock.objects.all()
    for stock in stocks:
        
        driver.get('https://stockplus.com/m/stocks/KOREA-A{}/analysis'.format(stock.code))
        time.sleep(1.5)
        raw = driver.page_source
        soup = BeautifulSoup(raw, 'html.parser')
        table = soup.select_one('.type02 tbody')

        for quarter, sales, operatingProfit, netIncome, operatingMargin, netProfitMargin, PER, PBR, ROE in zip(table.select('tr')[0].select('th'), table.select('tr')[1].select('td'), table.select('tr')[2].select('td'), table.select('tr')[3].select('td'), table.select('tr')[4].select('td'), table.select('tr')[5].select('td'), table.select('tr')[6].select('td'), table.select('tr')[7].select('td'), table.select('tr')[8].select('td')):
            if 'E' in quarter.text:
                break
            
            try:
                FinancialStat.objects.get(stock=stock, quarter=quarter.text.split('월')[0]+'월')
            except:
                FinancialStat(
                    stock=stock,
                    quarter=quarter.text.split('월')[0]+'월',
                    sales=sales.text.replace(',', ''),
                    operatingProfit=operatingProfit.text.replace(',', ''),
                    netIncome=netIncome.text.replace(',', ''),
                    operatingMargin=operatingMargin.text,
                    netProfitMargin=netProfitMargin.text,
                    PER=PER.text,
                    PBR=PBR.text,
                    ROE=ROE.text,
                ).save()
            

    driver.quit()

def CFCrawler():
    '''
    Cash Flow Crawler
    '''
    driver = webdriver.PhantomJS(os.path.join(BASE_DIR, 'core/crawlers/phantomjs/phantomjs-2.1.1-linux-x86_64/bin/phantomjs'))
    # driver = webdriver.PhantomJS(os.path.join(BASE_DIR, 'core/crawlers/phantomjs/phantomjs-2.1.1-macosx/bin/phantomjs')) 
    driver.implicitly_wait(2)
    stocks = Stock.objects.filter(id__gt=670)
    quarter_list=['15년 12월', '16년 12월', '17년 12월', '18년 12월', '19년 12월']
    with open('./data/Cash_Flow.csv','a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames = ['title','quarter','OperatingCashFlow','InvestingCashFlow','FinancingCashFlow','IncreaseInCashAndCashEquivalents','EndCashPosition'])
        # writer.writeheader()
        for stock in stocks:
            OperatingCashFlow=[] #영업활동으로인한현금흐름
            InvestingCashFlow=[] #투자활동으로인한현금흐름
            FinancingCashFlow=[] #재무활동으로인한현금흐름
            IncreaseInCashAndCashEquivalents = [] # 현금및현금성자산의증가
            EndCashPosition=[]   #기말현금및현금성자산



            driver.get('https://navercomp.wisereport.co.kr/v2/company/c1030001.aspx?cmp_cd={}&cn='.format(stock.code))
        
            time.sleep(2)
            cashflowButton = driver.find_element_by_id('rpt_tab3')
            cashflowButton.click()
            time.sleep(2)
            raw = driver.page_source
            soup = BeautifulSoup(raw, 'html.parser')
            
            table = soup.select('.lvl1')[0].select('td')
            for i in range(1, 6):
                OperatingCashFlow.append(table[i].text)
            
            table = soup.select('.lvl1')[1].select('td')
            for i in range(1, 6):
                InvestingCashFlow.append(table[i].text)
            
            table = soup.select('.lvl1')[2].select('td')
            for i in range(1, 6):
                FinancingCashFlow.append(table[i].text)
            
            table = soup.select('.lvl1')[6].select('td')
            for i in range(1, 6):
                IncreaseInCashAndCashEquivalents.append(table[i].text)
            
            table = soup.select('.lvl1')[8].select('td')
            for i in range(1, 6):
                EndCashPosition.append(table[i].text)
            
            write_dict_list = []
            for index in range(5):
                write_dict_list.append({
                    'title' : stock.title,
                    'quarter' : quarter_list[index],
                    'OperatingCashFlow' : OperatingCashFlow[index],
                    'InvestingCashFlow' : InvestingCashFlow[index],
                    'FinancingCashFlow' : FinancingCashFlow[index],
                    'IncreaseInCashAndCashEquivalents' : IncreaseInCashAndCashEquivalents[index],
                    'EndCashPosition' : EndCashPosition[index]
                    })
            writer.writerows(write_dict_list)
            print(stock.title)
            
            






            

if __name__ == '__main__':
    #FSCrawler()
    CFCrawler()
    # a=Stock.objects.get(title='한국내화').id
    # print(a)