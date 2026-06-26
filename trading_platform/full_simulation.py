import sys
import os

# Add relevant directories to path
sys.path.append(os.path.abspath('signal_engine'))
sys.path.append(os.path.abspath('backend/signals'))

from crt_logic import CRTLogic
from liquidity_logic import LiquidityLogic
from structure_logic import StructureLogic
from confirmation_logic import ConfirmationLogic
from scoring_engine import ScoringEngine
from time_engine import TimeEngine
from notifications import TelegramNotifier
from datetime import time

def simulate_system():
    print("--- Starting Institutional Signal Simulation ---")

    # 1. Mock HTF Candle (Daily)
    htf_candle = {'Open': 1.1000, 'High': 1.1050, 'Low': 1.0950, 'Close': 1.1020}
    crt = CRTLogic().calculate_range(htf_candle)
    print(f"CRT Range Set: {crt['low']} - {crt['high']} (Mid: {crt['midpoint']})")

    # 2. Mock Current Price Action (M5/M15)
    # Price sweeps high then returns inside
    execution_candle = {'High': 1.1060, 'Low': 1.1030, 'Close': 1.1045}
    bias = "Bearish" # Looking for Sell in Premium

    # 3. Detect Patterns
    sweep = LiquidityLogic().detect_sweep(1.1060, 1.1030, crt['high'], crt['low'])
    uts = LiquidityLogic().detect_turtle_soup(execution_candle, crt['high'], crt['low'], bias)

    print(f"Sweep Detected: {sweep['swept_high']}")
    print(f"Turtle Soup Setup: {uts}")

    # 4. Confirmations
    # Mock some candles for CISD
    recent_candles = [
        {'Open': 1.1040, 'High': 1.1060, 'Low': 1.1035, 'Close': 1.1055}, # Bullish sweep candle
        {'Open': 1.1055, 'High': 1.1058, 'Low': 1.1020, 'Close': 1.1025}  # Strong bearish reversal
    ]
    cisd = ConfirmationLogic().detect_cisd(recent_candles)
    print(f"CISD Detected: {cisd}")

    # 5. Timing
    session = TimeEngine().is_in_session(time(13, 30)) # NY Open
    print(f"Session: {session}")

    # 6. Scoring
    confirmations = {
        'htf_bias': True,
        'crt_range': True,
        'liquidity_sweep': sweep['swept_high'],
        'turtle_soup': uts is not None,
        'cisd': cisd is not None,
        'timing': session is not None
    }
    score = ScoringEngine().calculate_score(confirmations)
    print(f"Institutional Confidence Score: {score}/100")

    if score >= 60:
        print("✅ HIGH PROBABILITY SIGNAL GENERATED")
        signal_data = {
            'pair': 'EURUSD',
            'direction': 'SELL',
            'entry_price': 1.1045,
            'sl': 1.1065,
            'tp1': 1.1000,
            'confidence_score': score,
            'setup_type': f"CRT + {uts} + {cisd}"
        }
        # In real system, this would call notifier.send_signal(signal_data)
        # And save to Django DB
        print(f"Signal Details: {signal_data}")

if __name__ == "__main__":
    simulate_system()
