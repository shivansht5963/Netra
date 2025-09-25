import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface SuccessMessageProps {
  message: string;
  title?: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ 
  message, 
  title = 'Success'
}) => {
  return (
    <Alert 
      severity="success" 
      icon={<CheckCircleOutlineIcon />}
      sx={{ mb: 2 }}
    >
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};

export default SuccessMessage;