from django.contrib.auth import authenticate, get_user_model

from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework import status, viewsets, generics
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .serializers import UserSerializer, ChangePasswordSerializer
from .permissions import UserPermission


UserModel = get_user_model()


class UserRegisterView(generics.CreateAPIView):
    permission_classes = (UserPermission,)
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            (token, _) = Token.objects.get_or_create(user=user)

            data = {
                "token": token.key,
                "id": user.id,
                "email": user.email,
            }

            return Response(data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        user = authenticate(request, **request.data)

        if user:
            (token, _) = Token.objects.get_or_create(user=user)
            data = {"token": token.key, "id": user.id, "email": user.email}

            return Response(data, status=status.HTTP_200_OK)

        return Response({"username": ["Wrong email/password."]}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        try:
            Token.objects.get(user=request.user).delete()
        except Token.DoesNotExist:
            pass

        return Response({"success": True}, status=status.HTTP_200_OK)


class ChangePasswordView(generics.UpdateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = ChangePasswordSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj
