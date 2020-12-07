# connect djangodb with mysql

### install mysql
```
(on your virtualenv)
$ sudo apt-get update
$ sudo apt-get install mysql-server
$ sudo apt-get install libmysqlclient-dev
$ pip3 install mysqlclient
```

### set up db
```
$ sudo mysql -u root -p
(password is your os root password)

mysql> CREATE DATABASE stockinDB CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
mysql> create user 'swpp'@'%' identified by 'Swpp2020-team15!';
mysql> grant all on stockinDB.* to 'team15'@'%';
mysql> flush privileges;
```

open **backend/stockin/setting.py**
and edit database setting like below
```
DATABASES = {
    'default' : {
        'ENGINE': 'django.db.backends.mysql',    
        'NAME': 'stockinDB',                     
        'USER': 'team15',                          
        'PASSWORD': '1234',                  
        'HOST': 'localhost',                     
        'PORT': '3306',                          
    }
}
```
### migrate
```
$ python manage.py makemigrations
$ python manage.py migrate
```

# reset sqlite3

### Remove all the migration files
```
$ find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
$ find . -path "*/migrations/*.pyc"  -delete
```

### Delete db.sqlite3
```
$ rm db.sqlite3
```

### Create and run the migrations:
```
$ python manage.py makemigrations && python manage.py migrate
```

### Sync the DB
```
$ python manage.py migrate --run-syncdb
```





    

