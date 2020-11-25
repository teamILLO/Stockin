from django.urls import path
from stocks import views

urlpatterns = [
    path('', views.stock_list, name='stock list'),
    path('financialstats/stock/<int:stock_id>/',
         views.stock_fs, name='stock_fs'),
    # user model
    path('price/<int:stock_id>/', views.price_list, name='price_list'),
]