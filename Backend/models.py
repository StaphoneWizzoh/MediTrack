from django.db import models
from django.contrib.auth.models import User

class Appointment(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')
    doctor_name = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"Appointment with {self.doctor_name} on {self.date} at {self.time}"
