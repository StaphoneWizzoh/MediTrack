# Generated by Django 4.2 on 2025-01-03 11:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_patient_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='password',
            field=models.CharField(max_length=240),
        ),
    ]