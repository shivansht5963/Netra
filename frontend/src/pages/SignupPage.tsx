import React from 'react';
import { Container, Typography, Stack } from '@mui/material';
import SignupForm from '../components/auth/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Typography variant="h4" component="h1" textAlign="center" fontWeight={600}>
          Join Netra
        </Typography>
        <SignupForm />
      </Stack>
    </Container>
  );
};

export default SignupPage;