import React from 'react';
import { 
  Stack, 
  Pagination, 
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} 
      justifyContent="space-between" 
      alignItems="center" 
      spacing={2}
      sx={{ mt: 2 }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing {startItem}-{endItem} of {totalItems} results
      </Typography>
      
      <Stack direction="row" alignItems="center" spacing={2}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Items per page</InputLabel>
          <Select
            value={pageSize}
            label="Items per page"
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Stack>
    </Stack>
  );
};

export default PaginationControls;