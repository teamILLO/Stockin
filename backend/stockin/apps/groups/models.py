from django.db import models
from django.contrib.auth import get_user_model
from apps.stocks.models import Stock

UserModel = get_user_model()

# Create your models here.
class Group(models.Model):
    user = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE,
        related_name='group_of_user',
    )
    name = models.CharField(max_length=64, default='default')


