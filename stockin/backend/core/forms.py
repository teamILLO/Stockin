'''
This file is for custom user settings.
'''
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    '''
    CustomUserCreationForm
    '''

    class Meta(UserCreationForm):
        model = CustomUser
        fields = ('email','nickname',)


class CustomUserChangeForm(UserChangeForm):
    '''
    CustomUserChangeForm
    '''

    class Meta:
        model = CustomUser
        fields = ('email','nickname',)
