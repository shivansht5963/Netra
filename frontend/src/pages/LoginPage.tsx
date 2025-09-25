import React from 'react';
import { Container, Typography, Stack } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Typography variant="h4" component="h1" textAlign="center" fontWeight={600}>
          Welcome Back
        </Typography>
        <LoginForm />
      </Stack>
    </Container>
  );
};

export default LoginPage;