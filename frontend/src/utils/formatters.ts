export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatConfidenceScore = (score: number): string => {
  return `${(score * 100).toFixed(1)}%`;
};

export const formatUrlStatus = (isPhishing: boolean): string => {
  return isPhishing ? 'Phishing Detected' : 'Safe URL';
};

export const normalizeUrl = (url: string): string => {
  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'https://' + normalizedUrl;
  }
  return normalizedUrl;
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(normalizeUrl(url));
    return true;
  } catch {
    return false;
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};