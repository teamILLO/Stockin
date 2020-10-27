## Available Scripts

In the `stockin/` directory, you can run:

#### `python manage.py runserver --settings=stockin.settings.development`

Runs the app in the development mode.<br />
It is same to `python manage.py runserverer`


## When you have with DB problem(operational error...)

### 1. Remove all the migration files
#### `find . -path "*/migrations/*.py" -not -name "__init__.py" -delete`
#### `find . -path "*/migrations/*.pyc"  -delete`

### 2. Delete db.sqlite3
#### `rm db.sqlite3`

### 3. Create and run the migrations:
#### `python manage.py makemigrations && python manage.py migrate`

### 3. Sync the DB
#### `manage.py migrate --run-syncdb`





    
