from django.urls import path
from groups import views

urlpatterns = [
    path('', views.group_list_and_create, name='group_list_and_create'),
    path('<int:id>/', views.group_edit, name='group_edit'),
    path('<int:id>/stocks/', views.group_stock_list, name='group_stock edit'),
    path('<int:group_id>/stocks/<int:stock_id>/', views.group_stock_delete, name='group_stock_delete')
]