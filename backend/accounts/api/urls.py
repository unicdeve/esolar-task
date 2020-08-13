from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import UserRegisterView, LoginViewSet, LogoutViewSet, ChangePasswordView

router = DefaultRouter()
router.register("login", LoginViewSet, base_name="login")
router.register("logout", LogoutViewSet, base_name="logout")

urlpatterns = [
    path("register/", UserRegisterView.as_view(), name="register-user"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
]


urlpatterns += router.urls
