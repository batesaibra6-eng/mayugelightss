# Institutional Trading Platform - Romeotpt Methodology

Modular trading platform implementing CRT, Turtle Soup, and KOD strategies.

## Architecture

1.  **Signal Engine**: Core logic for pattern detection (Python).
2.  **Django Backend**: REST API, Signal distribution, and Notification system.
3.  **Next.js Dashboard**: Real-time signal feed, trade tracking, and analytics.

## Deployment on Windows VPS (MT5)

1.  **MT5 Integration**:
    The signal engine is designed to interface with the `MetaTrader5` library.
    Ensure MT5 is installed and "AutoTrading" is enabled.

2.  **Environment Setup**:
    ```bash
    pip install -r requirements.txt
    python manage.py migrate
    ```

3.  **Run Services**:
    - Backend: `python manage.py runserver`
    - Signal Scanner: `python signal_engine/scanner.py` (Implementation depends on MT5 terminal state)
    - Frontend: `npm run dev`

## Methodology Logic
- **CRT**: Higher Timeframe candle range analysis.
- **Turtle Soup**: Fakeout detection at HTF extremes.
- **CISD/KOD**: Confirmation of reversal via delivery shift.
