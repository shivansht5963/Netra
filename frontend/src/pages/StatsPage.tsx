import React, { useState } from 'react';
import { Container, Typography, Stack } from '@mui/material';
import { useGetStatsQuery } from '../store/apiSlice';
import StatsTable from '../components/stats/StatsTable';
import PaginationControls from '../components/stats/PaginationControls';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';

const StatsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error, refetch } = useGetStatsQuery({
    page: currentPage,
    page_size: pageSize
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const totalPages = data ? Math.ceil(data.count / pageSize) : 0;

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LoadingSpinner message="Loading your statistics..." />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <PollOutlinedIcon color="primary" />
          <Typography variant="h4" component="h1" fontWeight={600}>
            Your Reported URLs
          </Typography>
        </Stack>

        {error && (
          <ErrorMessage 
            message="Failed to load statistics. Please try again."
          />
        )}

        {data && (
          <>
            <StatsTable data={data.results} />
            
            {data.count > pageSize && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={data.count}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </>
        )}
      </Stack>
    </Container>
  );
};

export default StatsPage;