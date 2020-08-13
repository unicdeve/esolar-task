from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework import serializers
from todo.models import Todo

User = get_user_model()


class TodoSerializer(serializers.ModelSerializer):
    # adding request.user automatically
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Todo
        fields = "__all__"
