class StructureLogic:
    """
    Identifies Market Structure Shifts (MSS) and Break of Structure (BOS).
    """

    @staticmethod
    def detect_mss(current_candle, last_swing_high, last_swing_low):
        """
        Detects a Market Structure Shift.
        MSS occurs when a candle closes beyond the recent swing extreme.
        """
        close = current_candle['Close']

        mss_bullish = close > last_swing_high
        mss_bearish = close < last_swing_low

        if mss_bullish:
            return "Bullish MSS"
        elif mss_bearish:
            return "Bearish MSS"
        return None

    @staticmethod
    def detect_bos(current_candle, current_trend_extreme):
        """
        Break of Structure (BOS) occurs when the trend continues
        by breaking the previous trend high/low.
        """
        close = current_candle['Close']

        if close > current_trend_extreme:
            return "Bullish BOS"
        elif close < current_trend_extreme:
            return "Bearish BOS"
        return None

    @staticmethod
    def identify_internal_vs_external(price, htf_range):
        """
        Price inside HTF range is Internal Liquidity.
        Price outside HTF range is External Liquidity.
        """
        if price > htf_range['high'] or price < htf_range['low']:
            return "External"
        return "Internal"
