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





print('데이터 불려오는 중........')
torch.manual_seed(0)

stocks = Stock.objects.all().values_list('id', 'title').order_by('id')
stocks_data={}
normalization=[]
endDate=datetime.date(2020,11,26) 
startDate_l = datetime.date(2019,11,29)  # 246 rows
startDate = datetime.date(2019,10,2)     # 286 rows

for stock in stocks:
    data = StockHistory.objects.filter(stock_id=stock[0]).order_by('date').filter(date__gte=startDate.strftime('%Y-%m-%d')).filter(date__lte=endDate.strftime('%Y-%m-%d')).values_list('endPrice', 
                                                                                                                                                                'startPrice',
                                                                                                                                                                'highestPrice',
                                                                                                                                                                'lowestPrice',
                                                                                                                                                                'tradeVolume',
                                                                                                                                                                'news')
    stocks_data[stock[1]]=np.array(list(data))
    
    


# def minmax_scalar(data):
#     numerator = data - np.min(data,0)
#     denominator = np.max(data,0) - np.min(data,0)
#     return numerator /(denominator +1e-7)

    
robustScaler = RobustScaler()
   
seq_length = 10
data_dim = 6
hidden_dim = 20
output_dim = 1
learning_rate = 0.01

iterations = 300
stock_iterations=30
random_stocks=50

def build_dataset(time_series, seq_length):
    dataX=[]
    dataY=[]
    for i in range(40, len(time_series) - seq_length):
        robustScaler.fit(time_series[i-40: i+seq_length])
        After_normalization = robustScaler.transform(time_series[i-40:i+seq_length])
        _x = After_normalization[40:40 +seq_length, :]
        _y = robustScaler.transform(time_series[i+seq_length : i+seq_length+1])[0][0]
        

        dataX.append(_x)
        dataY.append(_y)
    return np.array(dataX), np.array(dataY)


class Net(torch.nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim, layers):
        super(Net, self).__init__()
        self.rnn = torch.nn.LSTM(input_dim, hidden_dim, num_layers= layers, batch_first= True)
        self.fc = torch.nn.Linear(hidden_dim, output_dim, bias =True)
    
    def forward(self, x):
        x, _status= self.rnn(x)
        x= self.fc(x[:,-1])
        return x


net = Net(data_dim, hidden_dim, output_dim, 1)
try:
    net.load_state_dict(torch.load('./Models/1day_models.pt'))
except:
    pass

criterion = torch.nn.MSELoss()
optimizer = optim.Adam(net.parameters(), lr=learning_rate)

print('데이터 전처리 중........')


for index in range(stock_iterations):
    train_input=np.empty((0,seq_length,6))
    train_output=np.empty(0)
    randomList = random.sample(list(stocks), random_stocks)

    for stock in randomList:
        print(stock[1],'처리 중...')
        train_set = stocks_data[stock[1]]

        if len(train_set) > 50:
            t_input, t_output = build_dataset(train_set, seq_length)

        train_input = np.append(train_input, t_input, axis=0)
        train_output = np.append(train_output, t_output, axis=0)
        print(train_input.shape, t_input.shape)
        print(train_output.shape, t_output.shape)
        


    train_input_tensor = torch.FloatTensor(train_input)
    train_output_tensor = torch.FloatTensor(train_output)

        

    for i in range(iterations):
        optimizer.zero_grad()
        
        results = net(train_input_tensor)
        
        loss = criterion(results, train_output_tensor.reshape(-1,1))
        loss.backward()
        
        optimizer.step()
        print('학습중........',i, loss.item())





torch.save(net.state_dict(),'./Models/1day_models.pt')


train_set = stocks_data[stocks[331][1]]

train_input, train_output = build_dataset(train_set, seq_length)

train_input_tensor = torch.FloatTensor(train_input)
train_output_tensor = torch.FloatTensor(train_output)

plt.plot(train_output)
plt.plot(net(train_input_tensor).data.numpy())
plt.legend(['Real-price', 'predict'])
plt.show()
