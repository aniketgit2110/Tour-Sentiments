from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import travelViewSet

travel_router = DefaultRouter()
travel_router.register(r'travels', travelViewSet, basename='travel')

urlpatterns = [
    path('api/travels/<str:place_desc>/', travelViewSet.as_view({'get': 'list'}), name='travel-list'),
]

urlpatterns += travel_router.urls
