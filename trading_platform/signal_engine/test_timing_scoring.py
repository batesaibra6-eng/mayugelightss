import unittest
from datetime import time
from time_engine import TimeEngine
from scoring_engine import ScoringEngine

class TestTimingScoring(unittest.TestCase):
    def test_timing(self):
        engine = TimeEngine()
        # 8:30 AM (London Open)
        self.assertEqual(engine.is_in_session(time(8, 30)), "London Open")
        # 11:00 AM (Gap)
        self.assertIsNone(engine.is_in_session(time(11, 0)))

    def test_scoring(self):
        engine = ScoringEngine()
        confirmations = {
            'htf_bias': True,
            'crt_range': True,
            'liquidity_sweep': True,
            'timing': True
        }
        # 15 + 20 + 15 + 10 = 60
        self.assertEqual(engine.calculate_score(confirmations), 60)

        # Perfect setup
        perfect = {k: True for k in ScoringEngine.WEIGHTS.keys()}
        self.assertEqual(engine.calculate_score(perfect), 100)

if __name__ == '__main__':
    unittest.main()
