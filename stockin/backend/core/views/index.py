'''
index
'''
import csv
import os
from django.core.exceptions import ObjectDoesNotExist
from django.db.utils import OperationalError
from core.crawlers.preprocessors.score import base_score



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
