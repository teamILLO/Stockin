## Files (Write down on what branch, on what files you have worked on)
  - stockin/backend/*

## Jobs (Write down what you have done)
  - New Backend with single app
  ```
  backend
  ├── core
  │   ├── __init__.py
  │   ├── __pycache__
  │   ├── admin.py
  │   ├── apps.py
  │   ├── crawlers
  │   ├── forms.py
  │   ├── managers.py
  │   ├── migrations
  │   ├── models.py
  │   ├── tests
  │   ├── urls.py
  │   └── views
  ├── db.sqlite3
  ├── manage.py
  ├── requirements.txt
  └── stockin
      ├── __init__.py
      ├── __pycache__
      ├── asgi.py
      ├── settings.py
      ├── urls.py
      └── wsgi.py
  ```
  - ```core/admin.py``` : Change form of django admin page
  - ```core/crawlers/``` : All crawlers included
  - ```core/forms.py``` : manage form of CustomUser model in django admin page
  - ```core/views/``` : All views included, seperated by feature(예전버전 앱 기준으로 뷰를 나눠놓음)
  - ```core/tests/``` : All tests included, seperated by feature(예전버전 앱 기준으로 테스트를 나눠놓음)
  

## Problems (Write down problems you have experienced)
  - Changing directories, revising directories copmared to old version is littile tricky  
    
## Evils (Write down weird things that you have done so that everyone should be careful)
  - None

## Plans (Write down what are you going to do next)
  - Confirm all api is working well
  
  
