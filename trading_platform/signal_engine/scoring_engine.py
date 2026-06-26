class ScoringEngine:
    """
    Calculates the Institutional Confidence Score (0-100).
    """

    WEIGHTS = {
        'htf_bias': 15,
        'crt_range': 20,
        'liquidity_sweep': 15,
        'turtle_soup': 10,
        'cisd': 10,
        'kod': 10,
        'market_structure': 10,
        'timing': 10
    }

    @staticmethod
    def calculate_score(confirmations):
        """
        'confirmations' is a dict of booleans indicating if a condition is met.
        """
        score = 0
        for key, weight in ScoringEngine.WEIGHTS.items():
            if confirmations.get(key):
                score += weight
        return score
