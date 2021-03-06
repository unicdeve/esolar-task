from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


class UserManager(BaseUserManager):
    def create_user(
        self, name, email, username, password=None,
    ):
        if not email:
            raise ValueError("User must have an email address!")

        email = self.normalize_email(email)
        user = self.model(name=name, email=email, username=username)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(
        self, name, email, username, password,
    ):
        user = self.create_user(name, email, username, password,)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=200)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True, verbose_name="E-mail Address")

    created_at = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    REQUIRED_FIELDS = [
        "name",
        "username",
    ]
    USERNAME_FIELD = "email"

    objects = UserManager()

    def save(self, *args, **kwargs):
        from django.db import transaction

        with transaction.atomic():
            super().save(*args, **kwargs)

            from rest_framework.authtoken.models import Token

            Token.objects.get_or_create(user=self)

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.email

    def __str__(self):
        return self.email

    class Meta:
        ordering = ("-created_at",)
