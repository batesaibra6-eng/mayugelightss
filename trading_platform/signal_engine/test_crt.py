import unittest
from crt_logic import CRTLogic

class TestCRTLogic(unittest.TestCase):
    def setUp(self):
        self.mock_candle = {
            'Open': 1.1000,
            'High': 1.1050,
            'Low': 1.0980,
            'Close': 1.1020
        }
        self.logic = CRTLogic()

    def test_calculate_range(self):
        res = self.logic.calculate_range(self.mock_candle)
        self.assertEqual(res['high'], 1.1050)
        self.assertEqual(res['low'], 1.0980)
        self.assertEqual(res['midpoint'], (1.1050 + 1.0980) / 2)
        self.assertTrue(res['is_bullish'])

    def test_check_sweeps(self):
        range_data = self.logic.calculate_range(self.mock_candle)
        # Price above high
        sweeps = self.logic.check_sweeps(1.1060, range_data)
        self.assertTrue(sweeps['swept_high'])
        self.assertFalse(sweeps['swept_low'])

        # Price below low
        sweeps = self.logic.check_sweeps(1.0970, range_data)
        self.assertFalse(sweeps['swept_high'])
        self.assertTrue(sweeps['swept_low'])

    def test_bias(self):
        range_data = self.logic.calculate_range(self.mock_candle)
        # In Premium
        bias = self.logic.get_bias(range_data, 1.1040)
        self.assertEqual(bias, "Premium (Sell Bias)")

        # In Discount
        bias = self.logic.get_bias(range_data, 1.0990)
        self.assertEqual(bias, "Discount (Buy Bias)")

if __name__ == '__main__':
    unittest.main()
