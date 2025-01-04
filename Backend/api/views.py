from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from .serializers import PatientSerializer, PatientLoginSerializer, PatientRegistrationSerializer
from .models import Patient
from .utils import hash_password, validate_hash


class PatientRegistrationView(generics.CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientRegistrationSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data={
            "name": request.data.get('name'),
            "phone": request.data.get('phone'),
            "email": request.data.get('email'),
            "password": hash_password(request.data.get('password'))
        })
        serializer.is_valid(raise_exception=True)
        patient = serializer.save()

        access = AccessToken.for_user(patient)
        refresh = RefreshToken.for_user(patient)

        return Response({
            "status": status.HTTP_201_CREATED,
            'token': str(refresh.access_token),
            'patient': PatientRegistrationSerializer(patient).data
        }, status=status.HTTP_201_CREATED)


class PatientLoginView(generics.CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientLoginSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        patient = Patient.objects.get(email=email)

        is_authenticated = validate_hash(password, patient.password)
        if is_authenticated:
            refresh = RefreshToken.for_user(patient)
            return Response({
                'status': status.HTTP_202_ACCEPTED,
                'token': str(refresh.access_token),
                'patient': PatientSerializer(patient).data
            }, status=status.HTTP_202_ACCEPTED)
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )


class PatientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({"status": 200, "patient": serializer.data})
