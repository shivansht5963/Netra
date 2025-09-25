import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Stack, 
  Chip,
  Alert,
  LinearProgress,
  Box
} from '@mui/material';
import { DetectionResult } from '../../types';
import { formatConfidenceScore } from '../../utils/formatters';
import { getRiskLevel, getScoreColor } from '../../utils/riskLevels';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface DetectionResultsProps {
  result: DetectionResult;
}

const DetectionResults: React.FC<DetectionResultsProps> = ({ result }) => {
  const riskLevel = getRiskLevel(result);
  
  return (
    <Card elevation={2}>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h6">
            Detection Results
          </Typography>

          <Alert 
            severity={riskLevel.color}
            icon={riskLevel.color === 'error' ? <WarningAmberIcon /> : <VerifiedUserOutlinedIcon />}
          >
            <Typography variant="h6">
              {riskLevel.level}
            </Typography>
            <Typography variant="body2">
              {riskLevel.color === 'error'
                ? 'This URL appears to be a phishing site. Do not enter personal information.'
                : riskLevel.color === 'warning'
                ? 'This URL has some suspicious characteristics. Proceed with caution.'
                : 'This URL appears to be safe based on our analysis.'
              }
            </Typography>
          </Alert>

          <Stack spacing={2}>
            <Typography variant="subtitle1">
              Security Score
            </Typography>
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Security Assessment
                </Typography>
                <Chip 
                  label={`${result.SCORE}/180 points`}
                  color={getScoreColor(result)}
                  size="small"
                />
              </Stack>
              <LinearProgress 
                variant="determinate" 
                value={(result.SCORE / 180) * 100}
                color={getScoreColor(result)}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          </Stack>

          <Stack spacing={2}>
            <Typography variant="subtitle1">
              Security Details
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                <strong>SSL Certificate:</strong> {result.hasSSLCertificate ? 'Valid' : 'Invalid'}
              </Typography>
              <Typography variant="body2">
                <strong>HTTPS:</strong> {result.isHTTPS ? 'Yes' : 'No'}
              </Typography>
              <Typography variant="body2">
                <strong>Domain Age:</strong> {result.isOlderThan3Months ? 'More than 3 months' : 'Less than 3 months'}
              </Typography>
              {result.InTop1Million && (
                <Typography variant="body2" color="success.main">
                  <strong>✓ Listed in Top 1 Million Safe Sites</strong>
                </Typography>
              )}
              {(result.InURLVoidBlackList || result.InMcaffeBlackList || result.InSucuriBlacklist || result.isBlackListedinIpSets) && (
                <Typography variant="body2" color="error.main">
                  <strong>⚠️ Found in Security Blacklists</strong>
                </Typography>
              )}
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
  );
};

export default DetectionResults;