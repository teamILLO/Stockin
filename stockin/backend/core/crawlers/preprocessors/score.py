import math as m
from sklearn.linear_model import LinearRegression

def base_score(operatingProfit, operatingCashFlow, liability, PER, avgPER, operatingMargin, avgOperatingMargin):
    # input must be in following structure
    # 
    #   opratingProfit: list, must contain data of '2019-06-01' to '2020-06-01'
    #   operatingCashFlow: list, must contain data of '2018-12-01' and '2019-12-01'
    #   liability : number, liability ratio,
    #   PER: number, current PER,
    #   avgPER : number, average PER of other stocks in same sector,
    #   operatingMargin: number, current operatingMargin,
    #   avgOperatingMargin: number, average operatingMargin,
    #
    # 

    OC_GOOD = 0.8
    OC_BAD = 0.5
    LIABILITY_GOOD = 1
    LIABILITY_BAD = 1.5

    OPERATING_PROFIT_MISSING = 1
    OPERATING_CASHFLOW_MISSING = 1<<1
    
    
    OP_PASS = False
    OC_PASS = False
    OP_COUNT = 5
    OP_score = 0
    OP_atan_coef = 1
    OC_score = 0
    OC_atan_coef = 1

    ############
    # objective scores
    # ----------------
    # operatingProfit
    # cashflow
    # liability ratio
    ############
    
    NOT_ASSESSABLE = {'score': None, 'status' : 0}
    trimmed_OP_list = []
    # dropout non-existing data
    # if recent data does not exist, NOT_ASSESSABLE
    if operatingProfit[4] == '' or operatingProfit[3] == '':
        NOT_ASSESSABLE['status'] |= OPERATING_PROFIT_MISSING
        return NOT_ASSESSABLE
    elif operatingProfit[2] == '':
        OP_PASS = True
    elif operatingProfit[1] == '' and operatingProfit[0] == '':
        OP_COUNT = 3
        trimmed_OP_list = operatingProfit[2:]
    elif operatingProfit[1] == '':
        OP_COUNT = 4
        for i in (0,2,3,4):
            trimmed_OP_list.append(operatingProfit[i])
    elif operatingProfit[0] == '':
        OP_COUNT = 4
        trimmed_OP_list = operatingProfit[1:]
    else:
        trimmed_OP_list = operatingProfit

    if operatingCashFlow[1] == '':
        NOT_ASSESSABLE['status'] |= OPERATING_CASHFLOW_MISSING
        return NOT_ASSESSABLE
    elif operatingCashFlow[0] == '':
        OC_PASS = True

    # calculate trend of operatingProfit
    # x 
    if OP_PASS == False:
        x = []
        for i in range(0, OP_COUNT):
            x.append([i/4])
        
        OP_model = LinearRegression().fit(x, trimmed_OP_list)
        OP_slope = OP_model.coef_
        OP_midpoint = OP_model.coef_ * (OP_COUNT-1)/8 + OP_model.intercept_
        OP_increase_rate = OP_slope/OP_model.intercept_
        OP_score = OP_atan_coef *(m.atan(OP_increase_rate)+m.atan(OP_model.intercept_/10))
                    
        # check if operatingCashFlow outlies from OP
        if OC_PASS == False:
            if operatingCashFlow[0] <= 0 or operatingCashFlow[1] <= 0 or OP_midpoint <= 0:
                pass
            elif operatingCashFlow[0]/OP_midpoint > OC_GOOD and operatingCashFlow[1]/OP_midpoint > OC_GOOD :
                #TODO: GOOD
                OC_score = OC_atan_coef * m.atan(min(operatingCashFlow[0]/OP_midpoint,operatingCashFlow[1]/OP_midpoint))
            elif operatingCashFlow[0]/OP_midpoint < OC_BAD and operatingCashFlow[1]/OP_midpoint < OC_BAD :
                #TODO: BAD
                OC_score = OC_atan_coef * m.atan(max(operatingCashFlow[0]/OP_midpoint, operatingCashFlow[1]/OP_midpoint))

    # check liability ratio
    liability_score = 0
    liability_atan_coef = 1
    if liability == '':
        pass
    else:
        liability = float(liability)
        if liability > LIABILITY_GOOD:
            liability_score = liability_atan_coef * m.atan(liability-LIABILITY_GOOD)
        elif liability < LIABILITY_BAD:
            liability_score = liability_atan_coef * m.atan(LIABILITY_BAD-liability)
            pass



    # calculate objective score



    ############
    # subjective scores
    # ---------------
    # PER
    # operatingmargin
    ############

    # calculate PER score
    PER_score = 0
    PER_atan_coef = 1
    if PER=='' or avgPER=='':
        pass
    else:
        PER_score = PER_atan_coef * m.atan(float(PER)-float(avgPER))

    # calculate operatingMargin
    OM_score = 0
    OM_atan_coef = 1
    if operatingMargin == '' or avgOperatingMargin == '':
        pass
    else:
        OM_score =  OM_atan_coef * m.atan(float(operatingMargin)-float(avgOperatingMargin))

    return {'score': OP_score + OC_score + liability_score + PER_score + OM_score}