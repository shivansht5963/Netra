import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorMessageProps {
  message: string;
  title?: string;
  severity?: 'error' | 'warning';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  title = 'Error',
  severity = 'error'
}) => {
  return (
    <Alert 
      severity={severity} 
      icon={<ErrorOutlineIcon />}
      sx={{ mb: 2 }}
    >
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorMessage;