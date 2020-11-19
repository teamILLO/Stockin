import numpy as np
from sklearn.linear_model import LinearRegression

def base_score(fs, cf):
    # input must be in following structure
    # fs:
    # {
    #   'opratingProfit': list, must contain data of '2019-09-01' to '2020-09-01'
    #   'netIncome': list, must contain data of '2019-09-01' to '2020-09-01'
    #   'PER': current PER,
    #   'avgPER' : average PER of other stocks in same sector,
    #   'operatingCashFlow': must contain data of '2018-12-01' and '2019-12-01'
    # 
    # }
    operatingProfit = fs['operatingProfit']
    netIncome = fs['netIncome']
    PER = fs['PER']
    operatingCashFlow = cf['operatingCashFlow']

    # change all '-' to 0, and if there are too many, set value to N/A

    OP_CHANGE_GOOD = 0.1 # increase rate per year, compared to initial value
    OP_CHANGE_BAD = -0.1
    NI_CHANGE_GOOD = 0.1
    NI_CHANGE_BAD = -0.1
    
    ############
    # objective scores
    ############

    # calculate trend of operatingProfit
    x = [[0], [0.25], [0.5], [0.75], [1]]
    OP_slope = LinearRegression().fit(x, operatingProfit).coef_
    OP_increase_rate = OP_slope/operatingProfit[0]

    # calculate trend of netIncome
    NI_slope = LinearRegression().fit(x, netIncome).coef_
    NI_increase_rate = OP_slope/netIncome[0]

    # check if operatingCashFlow outlies from OP and NI
    

    # calculate objective score



    ############
    # subjective scores
    ############

    # calculate PER score
