import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Stack 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/authSlice';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const NavigationBar: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
          <ShieldOutlinedIcon />
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              textDecoration: 'none', 
              color: 'inherit',
              fontWeight: 600
            }}
          >
            Netra
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
          >
            Home
          </Button>
          
          {isAuthenticated ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/report"
              >
                Report URL
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/stats"
              >
                Statistics
              </Button>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                startIcon={<ExitToAppIcon />}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                startIcon={<PersonOutlineIcon />}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/signup"
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;