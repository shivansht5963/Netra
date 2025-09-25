# Netra API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
The API uses token-based authentication for protected endpoints. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Endpoints

### 1. Detect Phishing URL
Analyzes a URL to determine if it's potentially a phishing site.

- **URL**: `/detect/`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
```json
{
    "url": "https://example.com"
}
```
- **Success Response**:
```json
{
    "is_phishing": true|false,
    "confidence_score": 0.95,  // Example score
    "details": {
        // Additional detection details if available
    }
}
```
- **Error Response**:
```json
{
    "url": ["Invalid url"]
}
```

### 2. User Signup
Register a new user account.

- **URL**: `/signup/`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
```json
{
    "email": "user@example.com",
    "username": "username",
    "name": "Full Name",
    "password": "secure_password"
}
```
- **Success Response**: 
  - **Code**: 201 CREATED
- **Error Response**:
```json
{
    "email": ["This field is required"],
    "username": ["This field is required"],
    "password": ["This field is required"]
}
```

### 3. Report URL
Report a suspicious URL for review.

- **URL**: `/report/`
- **Method**: `POST`
- **Auth Required**: Yes
- **Request Body**:
```json
{
    "url": "https://suspicious-site.com"
}
```
- **Success Response**:
```json
{
    "msg": "Successfully saved"
}
```
- **Error Response**:
```json
{
    "msg": "You have already reported the url"
}
```
or
```json
{
    "url": ["Invalid url"]
}
```

### 4. User Statistics
Get statistics about reported URLs for the authenticated user.

- **URL**: `/stats/`
- **Method**: `GET`
- **Auth Required**: Yes
- **Query Parameters**:
  - `page`: Page number for pagination (optional)
  - `page_size`: Number of items per page (optional)
- **Success Response**:
```json
{
    "count": 100,
    "next": "http://localhost:8000/api/stats/?page=2",
    "previous": null,
    "results": [
        {
            "url": "https://example.com",
            "reported_date": "2025-09-25T10:30:00Z",
            "email": "user@example.com",
            "username": "username",
            "confirmed": false
        }
    ]
}
```

### 5. Authentication
OAuth2 authentication endpoints.

#### Token Endpoint
- **URL**: `/auth/token/`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
```json
{
    "email": "user@example.com",
    "password": "your_password",
    "grant_type": "password"
}
```
- **Success Response**:
```json
{
    "access_token": "your_access_token",
    "token_type": "Bearer",
    "expires_in": 36000,
    "refresh_token": "your_refresh_token"
}
```

## Response Status Codes
- `200 OK`: Request succeeded
- `201 Created`: Resource was successfully created
- `400 Bad Request`: Invalid request body or parameters
- `401 Unauthorized`: Authentication required or failed
- `403 Forbidden`: User doesn't have permission
- `405 Method Not Allowed`: Wrong HTTP method used
- `500 Internal Server Error`: Server error

## Frontend Implementation Notes

1. **CSRF Token**:
   - For non-GET requests, include a CSRF token in the headers
   - Get the token from the cookie named 'csrftoken'
   - Add it to the request headers as 'X-CSRFToken'

2. **Error Handling**:
   - Always wrap API calls in try-catch blocks
   - Handle network errors gracefully
   - Show appropriate error messages to users

3. **Authentication Flow**:
   - Store the access token securely (e.g., in localStorage)
   - Include the token in all authenticated requests
   - Implement token refresh mechanism
   - Handle token expiration

4. **State Management**:
   - Use Redux or Context API for global state
   - Store user authentication state
   - Cache API responses when appropriate

5. **Required Frontend Routes**:
   ```
   /                   # Home page with URL checker
   /login             # Login page
   /signup            # Registration page
   /report            # Report URL form (protected)
   /stats             # User statistics (protected)
   ```

6. **Required Frontend Components**:
   - URL Check Form
   - Login Form
   - Registration Form
   - Report Form
   - Statistics Display
   - Navigation Bar
   - Error Messages
   - Loading States

7. **API Integration**:
   - Create an API service class/module
   - Implement interceptors for token handling
   - Use environment variables for API URLs
   - Implement proper loading and error states

## Development Setup
1. Start the Django backend:
   ```bash
   python manage.py runserver
   ```

2. Configure CORS in Django settings if needed
3. Set up environment variables for API URLs
4. Test all endpoints using Postman or similar tool before integration