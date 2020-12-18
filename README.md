# swpp2020-team15

[![Build Status](https://travis-ci.org/swsnu/swpp2020-team15.svg?branch=master)](https://travis-ci.org/swsnu/swpp2020-team15)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team15/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2020-team15?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2020-team15&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2020-team15)


![logo_mini](https://user-images.githubusercontent.com/59424336/102592016-38bf8300-4156-11eb-8c6f-4f1761061f87.png)

https://stockin.kr

# Frontend
### How to run frontend:
```
$ cd stockin/frontend
$ npm install
$ yarn start
````

### How to test frontend:
```
$ cd stockin/frontend
$ yarn
$ yarn test --coverage --watchAll=false
```

# Backend
### How to set up DB
```
$ sudo apt-get update
$ sudo apt-get install mysql-server
$ sudo apt-get install libmysqlclient-dev
$ sudo mysql -u root -p
$ CREATE DATABASE stockinDB CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
$ create user 'swpp'@'%' identified by [password];
$ grant all on stockinDB.* to 'swpp'@'%';
$ flush privileges;

It must be modified with the [password] in the setting.py
```
### How to run backend:
```
$ cd stockin/backend
$ pip install -r requirements.txt 
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver 
```
### How to do initial data setting
```
$ cd stockin/backend/core/crawlers
$ python StockCrawler.py initial
$ python StockCrawler.py past 1000
$ python StockCrawler.py realtime
```
### How to calculate daily ML score
```
$ pip install torch==1.7.1+cpu torchvision==0.8.2+cpu torchaudio==0.7.2 -f https://download.pytorch.org/whl/torch_stable.html
$ cd stockin/backend/core/ML
$ python ML.py
```

### How to test backend:
```
$ cd stockin/backend 
$ pip install -r requirements.txt 
$ python manage.py makemigrations 
$ python manage.py migrate
$ coverage run --source='.' manage.py test && coverage report
$ coverage run --branch --source='.' manage.py test && coverage report
```
