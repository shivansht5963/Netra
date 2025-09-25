// Mock data for development and testing
export const mockDetectionResult = {
  is_phishing: true,
  confidence_score: 0.95,
  details: {
    domain_age: 2,
    ssl_valid: false,
    suspicious_keywords: ['login', 'verify']
  }
};

export const mockUserStats = {
  count: 25,
  next: null,
  previous: null,
  results: [
    {
      url: 'https://suspicious-bank-login.com',
      reported_date: '2024-01-15T10:30:00Z',
      email: 'user@example.com',
      username: 'testuser',
      confirmed: true
    },
    {
      url: 'https://fake-paypal-verify.net',
      reported_date: '2024-01-14T15:45:00Z', 
      email: 'user@example.com',
      username: 'testuser',
      confirmed: false
    },
    {
      url: 'https://phishing-amazon-update.org',
      reported_date: '2024-01-13T09:20:00Z',
      email: 'user@example.com',
      username: 'testuser',
      confirmed: true
    }
  ]
};

export const mockRootProps = {
  apiBaseUrl: 'http://localhost:8000/api'
};