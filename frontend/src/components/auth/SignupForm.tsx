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
import { useSignupMutation } from '../../store/apiSlice';
import { validateEmail } from '../../utils/formatters';
import ErrorMessage from '../common/ErrorMessage';
import SuccessMessage from '../common/SuccessMessage';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    name: '',
    password: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [signup, { isLoading, error }] = useSignupMutation();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await signup(formData).unwrap();
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Signup failed:', err);
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
            title="Account Created Successfully"
            message="Your account has been created. Redirecting to login page..."
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
            <PersonAddOutlinedIcon color="primary" />
            <Typography variant="h5" component="h1" textAlign="center">
              Create Account
            </Typography>
          </Stack>

          {error && (
            <ErrorMessage 
              message={
                'data' in error 
                  ? Object.values(error.data).flat().join(', ')
                  : 'Signup failed. Please try again.'
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
                label="Username"
                value={formData.username}
                onChange={handleChange('username')}
                error={!!errors.username}
                helperText={errors.username}
                disabled={isLoading}
                required
              />

              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={handleChange('name')}
                error={!!errors.name}
                helperText={errors.name}
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
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Stack>
          </form>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            Already have an account?{' '}
            <MuiLink component={Link} to="/login" underline="hover">
              Sign in here
            </MuiLink>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SignupForm;