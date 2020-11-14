# swpp2020-team15

#### Current working branch : mid-presentation
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
### How to run backend:
```
$ sudo apt-get update
$ sudo apt-get install mysql-server (preferrably on virtual env)
$ sudo apt-get install libmysqlclient-dev (preferrably on virtualenv)
$ cd stockin/backend
$ pip install -r requirements.txt 
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver 
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
