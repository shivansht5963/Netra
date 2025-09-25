import React from 'react';
import { Container, Typography, Stack } from '@mui/material';
import ReportForm from '../components/report/ReportForm';

const ReportPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Stack spacing={2} textAlign="center">
          <Typography variant="h4" component="h1" fontWeight={600}>
            Report Suspicious URL
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Help protect the community by reporting phishing sites
          </Typography>
        </Stack>
        
        <ReportForm />
      </Stack>
    </Container>
  );
};

export default ReportPage;