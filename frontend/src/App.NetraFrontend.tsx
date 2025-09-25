import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { store } from './store';
import { initializeAuth } from './store/authSlice';
import theme from './theme';
import NavigationBar from './components/navigation/NavigationBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ReportPage from './pages/ReportPage';
import StatsPage from './pages/StatsPage';

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(initializeAuth());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route 
              path="/report" 
              element={
                <ProtectedRoute>
                  <ReportPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/stats" 
              element={
                <ProtectedRoute>
                  <StatsPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;