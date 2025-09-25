import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Stack, 
  Typography 
} from '@mui/material';
import { useDetectPhishingMutation } from '../../store/apiSlice';
import { validateUrl, normalizeUrl } from '../../utils/formatters';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';
import DetectionResults from './DetectionResults';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

const UrlCheckerForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [detectPhishing, { isLoading, error }] = useDetectPhishingMutation();
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous results
    setResult(null);
    setUrlError('');

    // Validate URL
    if (!url.trim()) {
      setUrlError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setUrlError('Please enter a valid URL');
      return;
    }

    try {
      const normalizedUrl = normalizeUrl(url);
      const response = await detectPhishing({ url: normalizedUrl }).unwrap();
      setResult(response);
    } catch (err: any) {
      console.error('Detection failed:', err);
    }
  };

  return (
    <Stack spacing={3}>
      <Card elevation={2}>
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LinkOutlinedIcon color="primary" />
              <Typography variant="h5" component="h1">
                URL Phishing Detector
              </Typography>
            </Stack>
            
            <Typography variant="body1" color="text.secondary">
              Enter a URL to check if it's potentially a phishing site
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Enter URL to check"
                  placeholder="example.com or https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  error={!!urlError}
                  helperText={urlError || 'You can enter with or without https://'}
                  disabled={isLoading}
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading || !url.trim()}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Check URL
                </Button>
              </Stack>
            </form>

            {error && (
              <ErrorMessage 
                message={
                  'data' in error && error.data?.url 
                    ? error.data.url[0] 
                    : 'Failed to check URL. Please try again.'
                }
              />
            )}
          </Stack>
        </CardContent>
      </Card>

      {isLoading && (
        <LoadingSpinner message="Analyzing URL..." />
      )}

      {result && (
        <DetectionResults result={result} />
      )}
    </Stack>
  );
};

export default UrlCheckerForm;