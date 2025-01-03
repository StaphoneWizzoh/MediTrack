from django.urls import path
from .views import (
    PatientRegistrationView,
    PatientLoginView,
    PatientDetailView
)

urlpatterns = [
    path('auth/register/', PatientRegistrationView.as_view(), name='register'),
    path('auth/login/', PatientLoginView.as_view(), name='login'),

    path('patients/profile/<int:pk>/',
         PatientDetailView.as_view(), name='profile'),
]
