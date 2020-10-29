from django.db import models

# Create your models here.

class Stock(models.Model):
    title = models.CharField(max_length=200)                    #종목이름
    code = models.CharField(max_length=200)                     #종목코드
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
        return str(self.stock.title)+ ' '+str(self.date)