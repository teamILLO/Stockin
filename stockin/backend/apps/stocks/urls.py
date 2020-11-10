from django.urls import path
from stocks import views

urlpatterns = [
    path('financialstats/stock/<int:stock_id>/',
         views.stock_fs, name='stock_fs'),
]
