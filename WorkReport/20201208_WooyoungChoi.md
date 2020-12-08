## Files (Write down on what branch, on what files you have worked on)
  - /etc/nginx/sites-enabled/frontend.conf
  - /etc/nginx/sites-enabled/backend.conf 

## Jobs (Write down what you have done)
  - site deploy in aws using nginx, gunicorn
  - connect to domain "stockin.kr"!
  - https redirect

## Problems (Write down problems you have experienced)
  - uwsgi : virtualenv python version and uwsgi python version is different (interpreter is not connected), etc...
  - Route53 : I tried to connect domain to server with Route53 in aws, but it is hard to use...
  - several errors to setup server
  
## Solutions

  ### Server deploy and setup problem
  * install mysqlclient error
  ```
  pip install --upgrade setuptools
  sudo apt-get install python3.7-dev
  ```

  * yarn permission denied
  ```
  cd ~/
  sudo chown -R $(whoami) .config
  ```
  
  * invalid host header
  ```
  # in node_modules/react-scripts/config/webpackDevServer.config.js
  disableHostCheck: true,
  ```
  
  ### useful comments
  
  ```
  # kill all (program)
  ps ax | grep (program)
  sudo pkill -f (program) -9
  ```
  
  ```
  # check nginx logic is correct
  sudo nginx -t
  ```
  
  ```
  # start gunicorn
  /home/ubuntu/virtualenv/bin/gunicorn -b localhost:8002 -w 8 --env DJANGO_SETTINGS_MODULE=stockin.settings stockin.wsgi:application
  ```
  

## Evils (Write down weird things that you have done so that everyone should be careful)
  - None

## Plans (Write down what are you going to do next)
  - solve issues
  
