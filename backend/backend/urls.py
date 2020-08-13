from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path
from django.conf.urls import include

from rest_framework_swagger.views import get_swagger_view


schema_view = get_swagger_view(title="Todo")

urlpatterns = [
    path("", schema_view),
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("account/", include("accounts.api.urls")),
    path("todo/", include("todo.api.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

