// URL validation and status enums
export enum UrlStatus {
  SAFE = 'safe',
  PHISHING = 'phishing',
  UNKNOWN = 'unknown'
}

export enum ReportStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed'
}

export enum AuthStatus {
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  LOADING = 'loading'
}

// API Response Types
export interface DetectionResult {
  SCORE: number;  // The security score (0-180)
  InTop1Million: boolean;
  InURLVoidBlackList: boolean;
  isHTTPS: boolean;
  hasSSLCertificate: boolean;
  GoogleSafePassed: boolean;
  NortanWebSafePassed: boolean;
  InMcaffeBlackList: boolean;
  InSucuriBlacklist: boolean;
  isTemporaryDomain: boolean;
  isOlderThan3Months: boolean;
  isBlackListedinIpSets: boolean;
  result: boolean;
}

export type RiskLevel = {
  level: string;
  color: 'success' | 'warning' | 'error';
};

export interface AuthTokens {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export interface ReportedUrl {
  url: string;
  reported_date: string;
  email: string;
  username: string;
  confirmed: boolean;
}

export interface StatsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ReportedUrl[];
}

// Component Props Types
export interface UrlCheckerProps {
  onDetectionResult: (result: DetectionResult) => void;
  loading: boolean;
}

export interface AuthFormProps {
  onSubmit: (credentials: LoginCredentials | SignupCredentials) => void;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  grant_type: string;
}

export interface SignupCredentials {
  email: string;
  username: string;
  name: string;
  password: string;
}

// Store Types
export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
}

// Root component props interface
export interface AppProps {
  apiBaseUrl: string;
}