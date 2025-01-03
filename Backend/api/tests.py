from django.test import TestCase
from django.core.exceptions import ValidationError
from api.models import User, Patient
from api.serializers import PatientRegistrationSerializer, PatientProfileSerializer
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class UserModelTest(TestCase):
    def setUp(self):
        self.user_data = {
            'email': 'test@example.com',
            'password': 'testpass123',
            'first_name': 'Test',
            'last_name': 'User'
        }

    def test_create_user(self):
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(user.email, self.user_data['email'])
        self.assertTrue(user.check_password(self.user_data['password']))
        self.assertEqual(user.username, self.user_data['email'])

    def test_email_is_required(self):
        self.user_data['email'] = ''
        with self.assertRaises(ValidationError):
            user = User.objects.create_user(**self.user_data)
            user.full_clean()


class PatientModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='patientuser',
            email='patient@example.com',
            password='testpass123'
        )
        self.patient_data = {
            'user': self.user,
            'phone': '+254712345678'
        }

    def test_create_patient(self):
        patient = Patient.objects.create(**self.patient_data)
        self.assertEqual(patient.user, self.user)
        self.assertEqual(patient.phone, self.patient_data['phone'])

    def test_invalid_phone_number(self):
        self.patient_data['phone'] = 'invalid'
        with self.assertRaises(ValidationError):
            patient = Patient.objects.create(**self.patient_data)
            patient.full_clean()


class PatientRegistrationSerializerTest(TestCase):
    def setUp(self):
        self.valid_data = {
            'user': {
                'email': 'test@example.com',
                'name': 'Test User'
            },
            'password': 'testpass123',
            'phone': '+254712345678'
        }

    def test_valid_data_serialization(self):
        serializer = PatientRegistrationSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        patient = serializer.save()
        self.assertEqual(patient.user.email, self.valid_data['user']['email'])
        self.assertEqual(patient.phone, self.valid_data['phone'])

    def test_invalid_data_serialization(self):
        invalid_data = self.valid_data.copy()
        invalid_data['email'] = 'invalid-email'
        serializer = PatientRegistrationSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())


class PatientProfileSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            first_name='Test'
        )
        self.patient = Patient.objects.create(
            user=self.user,
            phone='+254712345678'
        )

    def test_serializer_contains_expected_fields(self):
        serializer = PatientProfileSerializer(instance=self.patient)
        expected_fields = ['id', 'email', 'name',
                           'phone', 'created_at', 'updated_at']
        self.assertEqual(set(serializer.data.keys()), set(expected_fields))


class PatientRegistrationViewTest(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')
        self.valid_payload = {
            'email': 'test@example.com',
            'password': 'testpass123',
            'name': 'Test User',
            'phone': '+254712345678'
        }

    def test_create_patient_account(self):
        response = self.client.post(
            self.register_url,
            self.valid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)
        self.assertIn('user', response.data)


class PatientLoginViewTest(APITestCase):
    def setUp(self):
        # Create user without username
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        self.patient = Patient.objects.create(
            user=self.user,
            phone='+254712345678'
        )

    def test_login_with_valid_credentials(self):
        response = self.client.post(
            self.login_url,
            {
                'email': 'test@example.com',
                'password': 'testpass123'
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)


class PatientProfileViewTest(APITestCase):
    def setUp(self):
        self.profile_url = reverse('profile')
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.patient = Patient.objects.create(
            user=self.user,
            phone='+254712345678'
        )

    def test_get_profile_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_profile_unauthenticated(self):
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class PatientFlowIntegrationTest(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.profile_url = reverse('profile')
        self.user_data = {
            'user': {
                'email': 'test@example.com',
                'name': 'Test User'
            },
            'password': 'testpass123',
            'phone': '+254712345678'
        }

    def test_complete_patient_flow(self):
        # Step 1: Register
        register_response = self.client.post(
            self.register_url,
            self.user_data,
            format='json'
        )
        self.assertEqual(register_response.status_code,
                         status.HTTP_201_CREATED)
        self.assertIn('token', register_response.data)

        # Step 2: Login
        login_response = self.client.post(
            self.login_url,
            {
                'email': self.user_data['email'],
                'password': self.user_data['password']
            },
            format='json'
        )
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        token = login_response.data['token']

        # Step 3: Access Profile
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        profile_response = self.client.get(self.profile_url)
        self.assertEqual(profile_response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            profile_response.data['email'], self.user_data['email'])

        # Step 4: Update Profile
        update_data = {'name': 'Updated Name', 'phone': '+254787654321'}
        update_response = self.client.put(
            self.profile_url,
            update_data,
            format='json'
        )
        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(update_response.data['name'], update_data['name'])
        self.assertEqual(update_response.data['phone'], update_data['phone'])
