from django.urls import path
from stocks import views

urlpatterns = [
    # user model
    path('price/<int:stock_id>/', views.price_list, name='price_list'),
]