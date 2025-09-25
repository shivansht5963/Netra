import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip,
  Typography,
  Stack
} from '@mui/material';
import { ReportedUrl } from '../../types';
import { formatDate } from '../../utils/formatters';

interface StatsTableProps {
  data: ReportedUrl[];
}

const StatsTable: React.FC<StatsTableProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No reported URLs found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start by reporting suspicious URLs to see them here
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                URL
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Reported Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Status
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} hover>
              <TableCell>
                <Stack>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      wordBreak: 'break-all',
                      maxWidth: 300
                    }}
                  >
                    {item.url}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    by {item.username}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {formatDate(item.reported_date)}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={item.confirmed ? 'Confirmed' : 'Pending'}
                  color={item.confirmed ? 'success' : 'warning'}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;