import unittest
from structure_logic import StructureLogic

class TestStructureLogic(unittest.TestCase):
    def test_mss(self):
        logic = StructureLogic()
        # Bullish MSS
        candle = {'Close': 1.1060}
        res = logic.detect_mss(candle, 1.1050, 1.0950)
        self.assertEqual(res, "Bullish MSS")

        # Bearish MSS
        candle = {'Close': 1.0940}
        res = logic.detect_mss(candle, 1.1050, 1.0950)
        self.assertEqual(res, "Bearish MSS")

    def test_bos(self):
        logic = StructureLogic()
        # Bullish BOS
        candle = {'Close': 1.1100}
        res = logic.detect_bos(candle, 1.1080)
        self.assertEqual(res, "Bullish BOS")

    def test_internal_external(self):
        logic = StructureLogic()
        htf_range = {'high': 1.1000, 'low': 1.0900}

        self.assertEqual(logic.identify_internal_vs_external(1.1050, htf_range), "External")
        self.assertEqual(logic.identify_internal_vs_external(1.0950, htf_range), "Internal")

if __name__ == '__main__':
    unittest.main()
