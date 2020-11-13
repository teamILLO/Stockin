from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    nickname = models.CharField(max_length=20, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Stock(models.Model):
    title = models.CharField(max_length=200)                                #종목이름
    code = models.CharField(max_length=200)                                 #종목코드
    sector = models.CharField(max_length=200, null=True, blank=True)        #업종
    price = models.IntegerField(null=True, blank=True)                      #현재가
    highestPrice = models.IntegerField(null=True, blank=True)               #고가
    lowestPrice = models.IntegerField(null=True, blank=True)                #저가
    tradeVolume = models.IntegerField(null=True, blank=True)                #거래량
    tradeValue = models.BigIntegerField(null=True, blank=True)              #거래대금
    startPrice = models.IntegerField(null=True, blank=True)                 #시작가
    yesterdayPrice = models.IntegerField(null=True, blank=True)             #전가
    amount = models.IntegerField(null=True, blank=True)                     #상장주식수
    isKOSPI = models.BooleanField(null=True, blank=True)                    #is코스피?   코스피|코스닥

    def __str__(self):
        return self.title


class StockHistory(models.Model):
    stock = models.ForeignKey(
        Stock,
        on_delete = models.CASCADE
    )
    date = models.DateField(null=True)
    endPrice = models.IntegerField(null=True)
    startPrice = models.IntegerField(null=True)
    highestPrice = models.IntegerField(null=True)
    lowestPrice = models.IntegerField(null=True)
    tradeVolume = models.IntegerField(null=True)
    upDown = models.IntegerField(null=True)

    def __str__(self):
        return str(self.stock.title) + ' ' + str(self.date)


class FinancialStat(models.Model):
    stock = models.ForeignKey(
        Stock,
        on_delete = models.CASCADE
    )
    quarter = models.CharField(max_length=10, null=True)                    #분기 
    sales = models.CharField(max_length=10, null=True)                      #매출액
    operatingProfit = models.CharField(max_length=10, null=True)            #영업이익
    netIncome = models.CharField(max_length=10, null=True)                  #당기순이익
    operatingMargin = models.CharField(max_length=10, null=True)            #영업이익률
    netProfitMargin = models.CharField(max_length=10, null=True)            #순이익률
    PER = models.CharField(max_length=10, null=True)                        #PER
    PBR = models.CharField(max_length=10, null=True)                        #PBR
    ROE = models.CharField(max_length=10, null=True)                        #ROE

    def __str__(self):
        return str(self.stock.title) + ' ' + str(self.quarter)


class News(models.Model):
    stock = models.ForeignKey(
        Stock,
        on_delete = models.CASCADE,
        null=True
    )
    title = models.CharField(max_length=200, null=True)
    press = models.CharField(max_length=200, null=True)
    link = models.CharField(max_length=300, null=True)  
    date = models.DateField(null=True)

    def __str__(self):
        return str(self.date) + ' ' + str(self.stock.title) + ' ' + str(self.press)


class Group(models.Model):
    user = models.ForeignKey(
        CustomUser,
        null=True,
        on_delete=models.CASCADE,
        related_name='group_of_user',
    )
    name = models.CharField(max_length=64, default='default')
    stocks = models.ManyToManyField(Stock)

    def __str__(self):
        return str(self.user.id) + ' ' + str(self.name)


class Comment(models.Model):
    stock = models.ForeignKey(
        Stock,
        on_delete=models.CASCADE,
        related_name='comment_set'
    )
    author = models.ForeignKey(
        CustomUser,
        on_delete= models.CASCADE,
        related_name='comment_set'
    )
    time = models.DateTimeField(default=timezone.now)
    content = models.TextField()

    def __str__(self):
        return str(self.stock.title) + ' ' + str(self.author.email) + ' '
    