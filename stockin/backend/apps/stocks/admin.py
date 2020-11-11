from django.contrib import admin
from .models import Stock,StockHistory,FinancialStat
# Register your models here.

@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'code', 'sector', 'price',)
    list_display_links = ('title',)
    list_editable = ()
    list_per_page = 100
    list_filter = ()

@admin.register(FinancialStat)
class FinancialStatAdmin(admin.ModelAdmin):
    list_display = ('id','stock', 'quarter',)
    list_display_links = ('stock',)
    list_editable = ()
    list_per_page = 100
    list_filter = ()

admin.site.register(StockHistory)