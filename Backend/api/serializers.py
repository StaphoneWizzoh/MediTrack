from rest_framework import serializers

from .models import Patient
from .utils import hash_password


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'name', 'phone', 'email']
        read_only_fields = ['id', "email"]


class PatientLoginSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = ['email', 'password']


class PatientRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = ['name', 'phone', 'email', 'password']

# class PatientProfileSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(source='user.email', read_only=True)
#     name = serializers.CharField(source='user.first_name')

#     class Meta:
#         model = Patient
#         fields = ['id', 'email', 'name', 'phone', 'created_at', 'updated_at']
#         read_only_fields = ['email', 'created_at', 'updated_at']

#     def update(self, instance, validated_data):
#         user_data = validated_data.pop('user', {})
#         if 'first_name' in user_data:
#             instance.user.first_name = user_data['first_name']
#             instance.user.save()
#         return super().update(instance, validated_data)
