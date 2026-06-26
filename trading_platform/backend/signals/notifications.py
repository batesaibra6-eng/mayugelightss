import requests

class TelegramNotifier:
    """
    Sends signals and heartbeat messages to a Telegram group.
    """
    def __init__(self, token, chat_id):
        self.token = token
        self.chat_id = chat_id
        self.base_url = f"https://api.telegram.org/bot{self.token}/sendMessage"

    def send_message(self, text):
        if not self.token or not self.chat_id:
            print("Telegram credentials missing, skipping notification.")
            return None

        payload = {
            'chat_id': self.chat_id,
            'text': text,
            'parse_mode': 'Markdown'
        }
        try:
            response = requests.post(self.base_url, json=payload)
            return response.json()
        except Exception as e:
            print(f"Failed to send Telegram message: {e}")
            return None

    def send_signal(self, signal_data):
        message = (
            f"🚀 *NEW SIGNAL: {signal_data['pair']}*\n"
            f"Direction: {signal_data['direction']}\n"
            f"Entry: {signal_data['entry_price']}\n"
            f"SL: {signal_data['sl']}\n"
            f"TP: {signal_data['tp1']}\n"
            f"Score: {signal_data['confidence_score']}%\n"
            f"Reason: {signal_data['setup_type']}"
        )
        return self.send_message(message)

    def send_heartbeat(self):
        message = "💓 *Institutional Engine Heartbeat*\nStatus: Active\nNext check in 4 hours."
        return self.send_message(message)
