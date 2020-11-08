from django.contrib import admin
from .models import Stock,StockHistory,FinancialStat
# Register your models here.

admin.site.register(Stock)
admin.site.register(StockHistory)
admin.site.register(FinancialStat)