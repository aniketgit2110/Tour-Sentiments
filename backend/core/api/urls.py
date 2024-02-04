from rest_framework.routers import DefaultRouter
from recommend.api.urls import travel_router
from django.urls import path, include

router = DefaultRouter()

router.registry.extend(travel_router.registry)

urlpatterns = [
    path('',include(router.urls))
]
