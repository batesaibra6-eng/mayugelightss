import unittest
from confirmation_logic import ConfirmationLogic

class TestConfirmationLogic(unittest.TestCase):
    def test_cisd(self):
        logic = ConfirmationLogic()
        candles = [
            {'Open': 1.1020, 'High': 1.1030, 'Low': 1.1000, 'Close': 1.1010}, # Bearish
            {'Open': 1.1010, 'High': 1.1040, 'Low': 1.1005, 'Close': 1.1035}  # Bullish close above high
        ]
        self.assertEqual(logic.detect_cisd(candles), "Bullish CISD")

    def test_kod(self):
        logic = ConfirmationLogic()
        entry_zone = {'high': 1.1030, 'low': 1.1020}
        current_candle = {'High': 1.1025, 'Low': 1.1015, 'Close': 1.1022}

        self.assertEqual(logic.detect_kod(current_candle, entry_zone), "KOD Entry Triggered")

if __name__ == '__main__':
    unittest.main()
