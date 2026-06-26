class ConfirmationLogic:
    """
    Implements Change in State of Delivery (CISD) and Kiss of Death (KOD).
    """

    @staticmethod
    def detect_cisd(candles):
        """
        CISD: Change in State of Delivery.
        Often identified by a strong candle closing against the previous delivery state.
        For simplicity, we detect a strong engulfing-style close after a series of candles.
        'candles' is a list of recent candle dictionaries.
        """
        if len(candles) < 2:
            return None

        current = candles[-1]
        previous = candles[-2]

        # Bullish CISD: Strong bullish close above previous bearish candle's high
        if current['Close'] > previous['High'] and current['Close'] > current['Open']:
            return "Bullish CISD"

        # Bearish CISD: Strong bearish close below previous bullish candle's low
        if current['Close'] < previous['Low'] and current['Close'] < current['Open']:
            return "Bearish CISD"

        return None

    @staticmethod
    def detect_kod(current_candle, entry_zone):
        """
        Kiss of Death (KOD): A precise entry pattern after a sweep and CISD.
        Usually a retest of a specific candle's body close.
        """
        low = current_candle['Low']
        high = current_candle['High']

        # If price retraces into the entry zone (e.g. body of the CISD candle)
        if entry_zone['low'] <= high and entry_zone['high'] >= low:
            return "KOD Entry Triggered"

        return None
