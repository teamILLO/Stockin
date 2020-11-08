# Crawler


## install requirements
```
(on your virtualenv)
$ pip3 install -r requirements.txt
```


## StockCrawler.py


## NewsCrawler.py
```
python NewsCrawler.py (startDate) (endDate)
ex) python NewsCrawler.py 20201101 20201108
```


## FSCrwaler.py
```
python FSCrwaler.py
```
Crawl the financial statements of all stocks and store them in the stock.FinancialStat model. If there are any duplicates, they are not collected automatically.
