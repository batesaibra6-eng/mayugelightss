from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SignalViewSet, TradeViewSet, SubscriptionViewSet

router = DefaultRouter()
router.register(r'signals', SignalViewSet)
router.register(r'trades', TradeViewSet)
router.register(r'subscriptions', SubscriptionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
