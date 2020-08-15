from django.contrib.auth import authenticate

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework import status, viewsets

from .serializers import TodoSerializer
from .permissions import IsCurrentUserOrReadOnly
from todo.models import Todo


class TodoViewSet(viewsets.ModelViewSet):
    permission_classes = (
        IsCurrentUserOrReadOnly,
        IsAuthenticated,
    )
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def list(self, request):
        user = request.user
        qs = Todo.objects.filter(user=user)
        serializer = TodoSerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
