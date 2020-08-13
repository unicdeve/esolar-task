from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import TodoViewSet

router = DefaultRouter()
router.register("todo", TodoViewSet, base_name="todo")


urlpatterns = router.urls
