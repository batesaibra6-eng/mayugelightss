class LiquidityLogic:
    """
    Detects Liquidity Sweeps and Turtle Soup patterns.
    """

    @staticmethod
    def detect_sweep(current_high, current_low, previous_high, previous_low, threshold_pips=0.0001):
        """
        Detects if current price action has swept previous extremes.
        """
        swept_high = current_high > (previous_high + threshold_pips)
        swept_low = current_low < (previous_low - threshold_pips)

        return {
            'swept_high': swept_high,
            'swept_low': swept_low
        }

    @staticmethod
    def detect_turtle_soup(candle, previous_high, previous_low, bias):
        """
        Turtle Soup logic:
        1. Price sweeps a significant high/low.
        2. Price rejects and closes back inside the previous range.
        """
        high = candle['High']
        low = candle['Low']
        close = candle['Close']

        setup = None

        # Turtle Soup Short (UTS)
        if high > previous_high and close < previous_high and bias == "Bearish":
            setup = "Turtle Soup Short (UTS)"

        # Turtle Soup Long (UTL)
        elif low < previous_low and close > previous_low and bias == "Bullish":
            setup = "Turtle Soup Long (UTL)"

        return setup
