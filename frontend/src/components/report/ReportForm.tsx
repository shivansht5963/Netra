import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Stack, 
  Typography 
} from '@mui/material';
import { useReportUrlMutation } from '../../store/apiSlice';
import { validateUrl, normalizeUrl } from '../../utils/formatters';
import ErrorMessage from '../common/ErrorMessage';
import SuccessMessage from '../common/SuccessMessage';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

const ReportForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [reportUrl, { isLoading, error }] = useReportUrlMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setUrlError('');
    setShowSuccess(false);

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
      await reportUrl({ url: normalizedUrl }).unwrap();
      setShowSuccess(true);
      setUrl('');
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (err: any) {
      console.error('Report failed:', err);
    }
  };

  return (
    <Card elevation={2} sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <FlagOutlinedIcon color="primary" />
            <Typography variant="h5" component="h1">
              Report Suspicious URL
            </Typography>
          </Stack>
          
          <Typography variant="body1" color="text.secondary">
            Help protect others by reporting suspicious URLs that may be phishing sites
          </Typography>

          {showSuccess && (
            <SuccessMessage 
              title="URL Reported Successfully"
              message="Thank you for helping to keep the community safe. The URL has been submitted for review."
            />
          )}

          {error && (
            <ErrorMessage 
              message={
                'data' in error && error.data?.msg 
                  ? error.data.msg 
                  : 'data' in error && error.data?.url
                  ? error.data.url[0]
                  : 'Failed to report URL. Please try again.'
              }
            />
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Suspicious URL"
                placeholder="example.com or https://suspicious-site.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                error={!!urlError}
                helperText={urlError || 'Enter the URL you want to report as suspicious'}
                disabled={isLoading}
                multiline
                rows={2}
              />
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading || !url.trim()}
                sx={{ alignSelf: 'flex-start' }}
              >
                {isLoading ? 'Submitting Report...' : 'Submit Report'}
              </Button>
            </Stack>
          </form>

          <Typography variant="body2" color="text.secondary">
            <strong>Note:</strong> All reported URLs will be reviewed by our security team. 
            False reports may affect your account standing.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReportForm;