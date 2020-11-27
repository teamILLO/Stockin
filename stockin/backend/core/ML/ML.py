import os,sys, getopt

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(BASE_DIR)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stockin.settings')
import django
django.setup()
from core.models import Stock, StockHistory
import datetime
from time import time

import torch
import torch.optim as optim
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import RobustScaler
import random



class Net(torch.nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim, layers):
        super(Net, self).__init__()
        self.rnn = torch.nn.LSTM(input_dim, hidden_dim, num_layers= layers, batch_first= True)
        self.fc = torch.nn.Linear(hidden_dim, output_dim, bias =True)
    
    def forward(self, x):
        x, _status= self.rnn(x)
        x= self.fc(x[:,-1])
        return x



net1 = Net(6, 20, 1, 1)
net20 = Net(6, 30, 1, 1)
net60 = Net(6, 40, 1, 1)

net1.load_state_dict(torch.load('./Models/1day_models.pt'))
# net20.load_state_dict(torch.load('./Models/20day_models.pt'))
# net60.load_state_dict(torch.load('./Models/60day_models.pt'))



robustScaler = RobustScaler()

def after1():
    stocks = Stock.objects.all()
    for stock in stocks:
        print(stock.title)

        traindata=StockHistory.objects.filter(stock_id=stock.id).order_by('-date').values_list('endPrice','startPrice','highestPrice','lowestPrice','tradeVolume','news')[:50]
        if len(traindata) < 50:
            stock.after1 = -1
            stock.save()
            continue
        traindata=traindata[::-1]
        robustScaler.fit(traindata)
        
        After_normalization = robustScaler.transform(traindata)
        train_input=[]
        train_input.append(After_normalization[40:])
        d=torch.FloatTensor(np.array(train_input))

        result = net1(d).data.numpy()
        data=[[]]
        data[0].append(result[0][0])
        for i in range(5):
            data[0].append(0)

        aa=robustScaler.inverse_transform(data)
        stock.after1 = int(aa[0][0])
        stock.save()

def after20():
    stocks = Stock.objects.all()
    for stock in stocks:
        print(stock.title)

        traindata=StockHistory.objects.filter(stock_id=stock.id).order_by('-date').values_list('endPrice','startPrice','highestPrice','lowestPrice','tradeVolume','news')[:120]
        if len(traindata) < 120:
            stock.after20 = -1
            stock.save()
            continue
        traindata=traindata[::-1]
        robustScaler.fit(traindata)
        
        After_normalization = robustScaler.transform(traindata)
        train_input=[]
        train_input.append(After_normalization[80:])
        d=torch.FloatTensor(np.array(train_input))

        result = net1(d).data.numpy()
        data=[[]]
        data[0].append(result[0][0])
        for i in range(5):
            data[0].append(0)

        aa=robustScaler.inverse_transform(data)
        stock.after20 = int(aa[0][0])
        stock.save()

def after60():
    stocks = Stock.objects.all()
    for stock in stocks:
        print(stock.title)

        traindata=StockHistory.objects.filter(stock_id=stock.id).order_by('-date').values_list('endPrice','startPrice','highestPrice','lowestPrice','tradeVolume','news')[:200]
        if len(traindata) < 200:
            stock.after60 = -1
            stock.save()
            continue
        traindata=traindata[::-1]
        robustScaler.fit(traindata)
        
        After_normalization = robustScaler.transform(traindata)
        train_input=[]
        train_input.append(After_normalization[120:])
        d=torch.FloatTensor(np.array(train_input))

        result = net1(d).data.numpy()
        data=[[]]
        data[0].append(result[0][0])
        for i in range(5):
            data[0].append(0)

        aa=robustScaler.inverse_transform(data)
        stock.after60 = int(aa[0][0])
        stock.save()
     


        


after1()