import React from 'react';
import { Container, Typography, Stack } from '@mui/material';
import UrlCheckerForm from '../components/url-checker/UrlCheckerForm';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Stack spacing={2} textAlign="center">
          <Typography variant="h4" component="h1" fontWeight={600}>
            Netra - URL Phishing Detector
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Protect yourself from phishing attacks by checking suspicious URLs
          </Typography>
        </Stack>
        
        <UrlCheckerForm />
        
        <Stack spacing={2} textAlign="center" sx={{ mt: 4 }}>
          <Typography variant="h6">
            How to Test the System
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try these example URLs to test the phishing detection:
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" component="div">
              <strong>Potentially Safe:</strong> google.com, github.com, stackoverflow.com
            </Typography>
            <Typography variant="body2" component="div">
              <strong>Test Phishing URLs:</strong> You can create test URLs with suspicious keywords like 
              'login-verification', 'secure-bank-update', or domains that mimic legitimate sites
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default HomePage;