from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from reviews import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"groups", views.GroupViewSet)
router.register(r"reviews", views.ReviewViewSet)
router.register(r"businesses", views.BusinessViewSet)
router.register(r"categories", views.CategoryViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/user/", views.UserAPIView.as_view(), name="login"),
    path("api/register/", views.RegisterUserAPIView.as_view(), name="register"),
]
