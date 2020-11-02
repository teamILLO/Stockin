from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

from apps.stocks.models import Stock


# Create your models here.

UserModel = get_user_model()

class Comment(models.Model):
    stock = models.ForeignKey(
        Stock,
        on_delete=models.CASCADE,
        related_name='comment_set'
    )
    time = models.DateTimeField(default=timezone.now)
    content = models.TextField()
    author = models.ForeignKey(
        UserModel,
        on_delete= models.CASCADE,
        related_name='comment_set'
    )