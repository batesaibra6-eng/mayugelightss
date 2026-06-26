from datetime import datetime, time

class TimeEngine:
    """
    Manages session-based trading windows (London, New York).
    Times are usually in UTC or Broker Time (MT5).
    """

    SESSIONS = {
        'London Open': (time(7, 0), time(10, 0)),
        'NY Open': (time(12, 0), time(15, 0)),
        'London Close': (time(15, 0), time(17, 0)),
        'NY PM Macro': (time(19, 0), time(21, 0))
    }

    @staticmethod
    def is_in_session(current_time=None):
        """
        Checks if the current time falls within an institutional session window.
        """
        if current_time is None:
            current_time = datetime.utcnow().time()

        for session, (start, end) in TimeEngine.SESSIONS.items():
            if start <= current_time <= end:
                return session
        return None
