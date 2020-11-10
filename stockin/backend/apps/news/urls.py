from django.urls import path
from news import views

urlpatterns = [
    path('stocks/<int:stock_id>/date/<str:news_date>/', views.get_news_list, name='get_news_list'),
]