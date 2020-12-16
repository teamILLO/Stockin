'''
index
'''
from datetime import timedelta

import csv
import os
import numpy as np

from django.core.exceptions import ObjectDoesNotExist
from django.db.utils import OperationalError
from django.utils import timezone
from core.crawlers.preprocessors.score import base_score

from core.models import Stock, StockHistory



def get_fs_info(stock, fs_stock) :
    '''
    Get_Fs_Info
    '''
    op_ = ['','','','','']
    try:
        op_[4] = fs_stock.get(quarter='20년 6월').operatingProfit
    except (ObjectDoesNotExist, OperationalError):
        pass
    try:
        op_[3] = fs_stock.get(quarter='20년 3월').operatingProfit
    except (ObjectDoesNotExist, OperationalError):
        pass
    try:
        op_[2] = fs_stock.get(quarter='19년 12월').operatingProfit
    except (ObjectDoesNotExist, OperationalError):
        pass
    try:
        op_[1] = fs_stock.get(quarter='19년 6월').operatingProfit
    except (ObjectDoesNotExist, OperationalError):
        pass
    try:
        op_[0] = fs_stock.get(quarter='19년 3월').operatingProfit
    except (ObjectDoesNotExist, OperationalError):
        pass
    for i in range(5):
        if op_[i] == '-':
            op_[i] = ''
    # liability rate

    # operatingCashflow
    script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
    rel_path = "../crawlers/data/Cash_Flow.csv"
    abs_file_path = os.path.join(script_dir, rel_path)
    file_ = open(abs_file_path, 'r', encoding='utf-8')
    rdr = csv.reader(file_)
    operating_cashflow = []
    for line in rdr:
        if line[0] == stock.title and line[1] == '18년 12월' and line[2] == ' ':
            operating_cashflow.append('')
        elif line[0] == stock.title and line[1] == '18년 12월':
            operating_cashflow.append(float(str(line[2]).replace(',','')))
            # if line[2] == ' ':
            #     operating_cashflow.append('')
            # else:
            #     operating_cashflow.append(float(str(line[2]).replace(',','')))
        elif line[0] == stock.title and line[1] == '19년 12월' and line[2] == ' ':
            operating_cashflow.append('')
            break
        elif line[0] == stock.title and line[1] == '19년 12월':
            operating_cashflow.append(float(str(line[2]).replace(',','')))
            break
            # if line[2] == ' ':
            #     operating_cashflow.append('')
            # else:
            #     operating_cashflow.append(float(str(line[2]).replace(',','')))
            # break
    file_.close()

    # response = {'score' : score, 'status': if score is None,
    #              operatingProfitNotEnough 1, operatingCashflowNotEnough 2, Both 3}
    response = base_score(op_, operating_cashflow, stock.debtRatio, stock.crawledPER,
                        stock.crawledPERAvg, stock.operatingMarginRate,
                        stock.operatingMarginRateAvg)

    return response

def get_top_rank_info(info_len):
    '''
    get_top_rank_info
    '''
    enddate = timezone.now().date()
    startdate = enddate - timedelta(days=30)
    duration = int(np.busday_count(startdate, enddate+timedelta(days=1)))

    stocks=[]

    # using cache
    # stock_qs = cache.get_or_set('up_stockinfo', \
    #                   Stock.objects \
    #                   .exclude(tradeVolume__isnull=True) \
    #                   .exclude(tradeVolume__exact=0) \
    #                   .values('id','title','isKOSPI', \
    #                   'code','price','yesterdayPrice','score').order_by('-score'))
    # stocks = stock_qs[0:100]

    # 초기 filtering
    initial_stocks=Stock.objects.exclude(tradeVolume__isnull=True)  \
                                .exclude(tradeVolume__exact=0)      \
                                .values('id','title','isKOSPI',     \
                                'code','price','yesterdayPrice',    \
                                'score').order_by('-score')


    # 한달치 확인, length check
    cnt = 0
    for stock in initial_stocks :
        if cnt is info_len :
            break

        stockhis_qs = StockHistory.objects.filter(stock__id=stock['id'])            \
                                        .filter(date__range=[startdate, enddate])   \
                                        .exclude(tradeVolume__isnull=True)          \
                                        .exclude(tradeVolume__exact=0)

        # tradeVolume 에 null or 0 값이 없는 경우
        if stockhis_qs.count() is duration :
            stocks.append(stock)
            cnt = cnt + 1

    return stocks

def get_bottom_rank_info(info_len):
    '''
    get_bottom_rank_info
    '''
    enddate = timezone.now().date()
    startdate = enddate - timedelta(days=30)
    duration = int(np.busday_count(startdate, enddate+timedelta(days=1)))

    stocks=[]

    # using cache
    # stock_qs = cache.get_or_set('up_stockinfo', \
    #                   Stock.objects \
    #                   .exclude(tradeVolume__isnull=True) \
    #                   .exclude(tradeVolume__exact=0) \
    #                   .values('id','title','isKOSPI', \
    #                   'code','price','yesterdayPrice','score').order_by('score'))
    # stocks = stock_qs[0:100]

    # 초기 filtering
    initial_stocks=Stock.objects.exclude(tradeVolume__isnull=True)  \
                                .exclude(tradeVolume__exact=0)      \
                                .values('id','title','isKOSPI',     \
                                'code','price','yesterdayPrice',    \
                                'score').order_by('score')

    # 한달치 확인, length check
    cnt = 0
    for stock in initial_stocks :
        if cnt is info_len :
            break

        stockhis_qs = StockHistory.objects.filter(stock__id=stock['id'])            \
                                        .filter(date__range=[startdate, enddate])   \
                                        .exclude(tradeVolume__isnull=True)          \
                                        .exclude(tradeVolume__exact=0)

        # tradeVolume 에 null or 0 값이 없는 경우
        if stockhis_qs.count() is duration :
            stocks.append(stock)
            cnt = cnt + 1

    return stocks
