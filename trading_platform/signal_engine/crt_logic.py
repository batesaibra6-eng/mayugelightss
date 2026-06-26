import pandas as pd
import numpy as np

class CRTLogic:
    """
    Implements Romeotpt's Candle Range Theory (CRT).
    Every higher timeframe (HTF) candle is treated as a tradable range.
    """

    @staticmethod
    def calculate_range(candle):
        """
        Calculates the CRT range properties for a single candle.
        'candle' should be a dictionary or pandas Series with Open, High, Low, Close.
        """
        high = candle['High']
        low = candle['Low']
        open_price = candle['Open']
        close_price = candle['Close']

        midpoint = (high + low) / 2
        body_high = max(open_price, close_price)
        body_low = min(open_price, close_price)

        return {
            'high': high,
            'low': low,
            'midpoint': midpoint,
            'body_high': body_high,
            'body_low': body_low,
            'premium_zone': (midpoint, high),
            'discount_zone': (low, midpoint),
            'is_bullish': close_price > open_price
        }

    @staticmethod
    def check_sweeps(current_price, crt_range):
        """
        Checks if the current price has swept the CRT range extremes.
        """
        swept_high = current_price > crt_range['high']
        swept_low = current_price < crt_range['low']

        return {
            'swept_high': swept_high,
            'swept_low': swept_low
        }

    @staticmethod
    def get_bias(crt_range, current_price):
        """
        Determines the bias based on the current price relative to the CRT range.
        """
        if current_price > crt_range['midpoint']:
            return "Premium (Sell Bias)"
        else:
            return "Discount (Buy Bias)"
