import unittest
from unittest.mock import patch
from notifications import TelegramNotifier

class TestTelegramNotifier(unittest.TestCase):
    @patch('requests.post')
    def test_send_message(self, mock_post):
        mock_post.return_value.json.return_value = {'ok': True}
        notifier = TelegramNotifier("fake_token", "fake_chat_id")

        res = notifier.send_message("Hello Test")
        self.assertTrue(res['ok'])
        mock_post.assert_called_once()

if __name__ == '__main__':
    unittest.main()
