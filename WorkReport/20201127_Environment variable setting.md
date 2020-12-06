## How to set Environment variables

### 1. Open .bash_profile in home directory

```
$ vi ~/.bash_profile
```

### 2. In .bash_profile, add

```
export BACK_TEST_PWD="foo,foo_new"
export EMAIL_HOST_PASSWORD="swpp2020"
```

### 3. Sync environment variables

```
$ source ~/.bash_profile
```
