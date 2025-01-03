from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(
        max_length=150, unique=True, null=True, blank=True)


# class Patient(models.Model):
#     user = models.OneToOneField(
#         User, on_delete=models.CASCADE, related_name='patient')
#     phone = models.CharField(
#         max_length=15,
#         validators=[RegexValidator(regex=r'^\+?1?\d{9,15}$')]
#     )
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     objects = models.Manager()

#     def __str__(self):
#         return self.user.email

class Patient(models.Model):
    name = models.CharField(max_length=150, null=True, blank=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    password = models.CharField(max_length=240, blank=False, null=False)

    def __str__(self):
        return str(self.name)
