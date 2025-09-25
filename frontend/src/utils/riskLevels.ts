import { RiskLevel, DetectionResult } from '../types';

export const getRiskLevel = (result: DetectionResult): RiskLevel => {
  // Immediately return Very Safe for top million sites with good security
  if (result.InTop1Million && result.hasSSLCertificate && !result.InURLVoidBlackList) {
    return {
      level: 'Very Safe',
      color: 'success'
    };
  }

  const score = result.SCORE;

  // Very Safe (160-180): Known safe site with all security measures
  if (score >= 160) {
    return {
      level: 'Very Safe',
      color: 'success'
    };
  }

  // Generally Safe (140-159): Good security with minor concerns
  if (score >= 140) {
    return {
      level: 'Generally Safe',
      color: 'success'
    };
  }

  // Suspicious (100-139): Multiple security concerns
  if (score >= 100) {
    return {
      level: 'Suspicious',
      color: 'warning'
    };
  }

  // High Risk (Below 100): Major security issues
  return {
    level: 'High Risk',
    color: 'error'
  };
};

export const getScoreColor = (result: DetectionResult): 'success' | 'warning' | 'error' => {
  // Get the risk level and return its color
  return getRiskLevel(result).color;
};