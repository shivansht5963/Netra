import React from 'react';
import { CircularProgress, Stack, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  size = 40 
}) => {
  return (
    <Stack 
      direction="column" 
      alignItems="center" 
      spacing={2} 
      sx={{ py: 4 }}
    >
      <CircularProgress size={size} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Stack>
  );
};

export default LoadingSpinner;