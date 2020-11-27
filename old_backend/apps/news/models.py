from django.db import models
import os,sys

from apps.stocks.models import Stock

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
        return str(self.date)+ ' '+str(self.stock.title)+' '+str(self.press)