import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Stack, 
  Typography,
  Link as MuiLink
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../store/apiSlice';
import { loginSuccess } from '../../store/authSlice';
import { validateEmail } from '../../utils/formatters';
import ErrorMessage from '../common/ErrorMessage';
import SuccessMessage from '../common/SuccessMessage';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
        grant_type: 'password'
      }).unwrap();
      
      dispatch(loginSuccess(response));
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err: any) {
      console.error('Login failed:', err);
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (showSuccess) {
    return (
      <Card elevation={2} sx={{ maxWidth: 400, mx: 'auto' }}>
        <CardContent>
          <SuccessMessage 
            title="Login Successful"
            message="Welcome back! Redirecting to home page..."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={2} sx={{ maxWidth: 400, mx: 'auto' }}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
            <PersonOutlineIcon color="primary" />
            <Typography variant="h5" component="h1" textAlign="center">
              Sign In
            </Typography>
          </Stack>

          {error && (
            <ErrorMessage 
              message={
                'data' in error && error.data?.detail 
                  ? error.data.detail 
                  : 'Login failed. Please check your credentials.'
              }
            />
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                error={!!errors.email}
                helperText={errors.email}
                disabled={isLoading}
                required
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange('password')}
                error={!!errors.password}
                helperText={errors.password}
                disabled={isLoading}
                required
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Stack>
          </form>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            Don't have an account?{' '}
            <MuiLink component={Link} to="/signup" underline="hover">
              Sign up here
            </MuiLink>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LoginForm;