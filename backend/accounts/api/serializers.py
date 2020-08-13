from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework import serializers


UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = UserModel
        exclude = (
            "is_superuser",
            "is_staff",
            "is_active",
            "groups",
            "user_permissions",
            "updated",
            "last_login",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        if (
            ("password" in data)
            and ("confirm_password" not in data)
            or ("password" not in data)
            and ("confirm_password" in data)
        ):
            raise serializers.ValidationError(
                "password and confirm password are required."
            )

        if (
            ("password" in data)
            and ("confirm_password" in data)
            and (data["password"] != data["confirm_password"])
        ):
            raise serializers.ValidationError(
                "password and confirm password must match."
            )

        return data

    def save(self, **kwargs):
        self.validated_data.pop("confirm_password", None)
        return super().save(**kwargs)

    def create(self, validated_data):
        from django.db import transaction

        with transaction.atomic():
            user = super().create(validated_data)
            user.set_password(user.password)
            user.save(update_fields=["password"])

            return user


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True, max_length=30)
    password = serializers.CharField(required=True, max_length=30)
    confirm_password = serializers.CharField(required=True, max_length=30)

    def validate(self, data):
        if not self.context["request"].user.check_password(
            data.get("current_password")
        ):
            raise serializers.ValidationError({"current_password": "Wrong password."})

        if data.get("confirm_password") != data.get("password"):
            raise serializers.ValidationError(
                {"password": "Both passwords must match!"}
            )

        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data["password"])
        instance.save()
        return instance

    def create(self, validated_data):
        pass

    def patch(self, instance, validated_data):
        pass

    @property
    def data(self):
        return {"Success": True}

