from django.db import models
from django.contrib.auth.models import User

class Signal(models.Model):
    pair = models.CharField(max_length=20)
    direction = models.CharField(max_length=10, choices=[('BUY', 'BUY'), ('SELL', 'SELL')])
    entry_price = models.DecimalField(max_digits=20, decimal_places=5)
    sl = models.DecimalField(max_digits=20, decimal_places=5)
    tp1 = models.DecimalField(max_digits=20, decimal_places=5)
    tp2 = models.DecimalField(max_digits=20, decimal_places=5, null=True, blank=True)
    tp3 = models.DecimalField(max_digits=20, decimal_places=5, null=True, blank=True)
    confidence_score = models.IntegerField()
    setup_type = models.CharField(max_length=50) # e.g. CRT + UTS + KOD
    status = models.CharField(max_length=20, default='ACTIVE') # ACTIVE, TP_HIT, SL_HIT, CLOSED
    timestamp = models.DateTimeField(auto_now_add=True)
    reasoning = models.TextField()

    def __str__(self):
        return f"{self.pair} {self.direction} @ {self.entry_price}"

class Trade(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    signal = models.ForeignKey(Signal, on_delete=models.SET_NULL, null=True)
    lot_size = models.DecimalField(max_digits=10, decimal_places=2)
    entry_price = models.DecimalField(max_digits=20, decimal_places=5)
    pnl_usd = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    is_closed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class Subscription(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    plan = models.CharField(max_length=20, choices=[('BASIC', 'BASIC'), ('PREMIUM', 'PREMIUM'), ('TRIAL', 'TRIAL')])
    expires_at = models.DateTimeField()
    is_active = models.BooleanField(default=True)
