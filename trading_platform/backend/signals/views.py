from rest_framework import viewsets
from .models import Signal, Trade, Subscription
from .serializers import SignalSerializer, TradeSerializer, SubscriptionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class SignalViewSet(viewsets.ModelViewSet):
    queryset = Signal.objects.all().order_by('-timestamp')
    serializer_class = SignalSerializer
    permission_classes = [AllowAny] # Set to IsAuthenticated for production

class TradeViewSet(viewsets.ModelViewSet):
    queryset = Trade.objects.all()
    serializer_class = TradeSerializer
    permission_classes = [AllowAny]

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [AllowAny]
