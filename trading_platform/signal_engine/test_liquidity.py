import unittest
from liquidity_logic import LiquidityLogic

class TestLiquidityLogic(unittest.TestCase):
    def test_detect_sweep(self):
        logic = LiquidityLogic()
        # Test high sweep
        res = logic.detect_sweep(1.1060, 1.1000, 1.1050, 1.0950)
        self.assertTrue(res['swept_high'])
        self.assertFalse(res['swept_low'])

        # Test low sweep
        res = logic.detect_sweep(1.1000, 1.0940, 1.1050, 1.0950)
        self.assertFalse(res['swept_high'])
        self.assertTrue(res['swept_low'])

    def test_turtle_soup_short(self):
        logic = LiquidityLogic()
        candle = {'High': 1.1060, 'Low': 1.1020, 'Close': 1.1045}
        prev_high = 1.1050
        prev_low = 1.0950

        # Should detect UTS if bias matches
        setup = logic.detect_turtle_soup(candle, prev_high, prev_low, "Bearish")
        self.assertEqual(setup, "Turtle Soup Short (UTS)")

        # Should not detect if close is still above prev_high
        candle_no_close = {'High': 1.1060, 'Low': 1.1020, 'Close': 1.1055}
        setup = logic.detect_turtle_soup(candle_no_close, prev_high, prev_low, "Bearish")
        self.assertIsNone(setup)

    def test_turtle_soup_long(self):
        logic = LiquidityLogic()
        candle = {'High': 1.1000, 'Low': 1.0940, 'Close': 1.0960}
        prev_high = 1.1050
        prev_low = 1.0950

        setup = logic.detect_turtle_soup(candle, prev_high, prev_low, "Bullish")
        self.assertEqual(setup, "Turtle Soup Long (UTL)")

if __name__ == '__main__':
    unittest.main()
