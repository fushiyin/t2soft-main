# Role-Based Access Control Implementation

## Overview
The authentication system now includes comprehensive role-based access control (RBAC) to ensure that only users with admin roles can access admin routes. The system also provides a user-friendly admin dashboard link in the user profile dropdown for admin users.

## Implementation Details

### 1. Enhanced AuthContext
- **File**: `src/contexts/AuthContext.jsx`
- **Features**:
  - Fetches user profile data from Firestore including role information
  - Provides `userProfile`, `isAdmin`, and `userRole` to components
  - Automatically updates when authentication state changes

### 2. ProtectedRoute Component
- **File**: `src/components/auth/ProtectedRoute.jsx`
- **Features**:
  - General route protection with role requirements
  - Email verification enforcement (except for admin users)
  - Account status checking (active/inactive)

### 3. User Profile Dropdown with Admin Link
- **File**: `src/layouts/components/Header.jsx`
- **Features**:
  - Shows user role badge in dropdown
  - Displays "Admin Dashboard" link only for admin users
  - Uses Settings icon for admin dashboard link
  - Conditional rendering based on `isAdmin` flag
  - `AdminRoute` wrapper for admin-only routes

### 3. Role Management Hook
- **File**: `src/hooks/useRole.js`
- **Features**:
  - Easy-to-use role checking functions
  - `isAdmin`, `isInstructor`, `isStudent` boolean flags
  - `hasRole()` and `hasAnyRole()` utility functions

### 4. Updated Routing
- **File**: `src/routes/index.jsx`
- **Changes**:
  - All admin routes now wrapped with `AdminRoute` component
  - Automatic role-based access control
  - Proper error handling and redirects

## User Roles

### Admin Role
- **Access**: Full access to all admin routes (`/admin/*`)
- **Verification**: Can bypass email verification requirement
- **Features**: Complete administrative control

### Instructor Role
- **Access**: Limited to instructor-specific features
- **Verification**: Email verification required
- **Features**: Course management, student interaction

### Student Role
- **Access**: Student-specific features only
- **Verification**: Email verification required
- **Features**: Course enrollment, learning progress

## Admin Route Protection

All routes starting with `/admin` are now protected and require:
1. **Authentication**: User must be logged in
2. **Email Verification**: Email must be verified (except for admin users)
3. **Admin Role**: User profile must have `role: "admin"`
4. **Active Account**: User account must be active (`isActive: true`)

### Protected Admin Routes:
- `/admin` - Admin dashboard access
- `/admin/dashboard` - Main admin dashboard
- `/admin/posts` - Post management
- `/admin/posts/write` - Create new posts
- `/admin/users` - User management
- `/admin/roles` - Role management
- `/admin/courses` - Course management
- `/admin/settings` - System settings
- All other admin routes defined in sidebar

## Test Accounts

The following test accounts are available after running the user seeder:

### Admin Account
- **Email**: `admin@t2soft.com`
- **Password**: `Admin123!`
- **Role**: `admin`
- **Status**: Email verified, active

### Regular User Accounts
- **Email**: `test@example.com`
- **Password**: `Test123!`
- **Role**: `student`
- **Status**: Unverified (requires email verification)

## Usage Examples

### In Components
```jsx
import { useRole } from "@/hooks/useRole";

const MyComponent = () => {
  const { isAdmin, hasRole } = useRole();
  
  return (
    <div>
      {isAdmin && <AdminPanel />}
      {hasRole("instructor") && <InstructorTools />}
    </div>
  );
};
```

### Route Protection
```jsx
import { AdminRoute } from "@/components/auth/ProtectedRoute";

<AdminRoute>
  <AdminDashboard />
</AdminRoute>
```

## Security Features

1. **Automatic Redirects**: Non-admin users attempting to access admin routes are redirected to home
2. **Real-time Validation**: User role is checked on every route access
3. **Session Management**: Role information is updated when user data changes
4. **Error Handling**: Comprehensive error messages for access denial
5. **Toast Notifications**: User-friendly feedback for access attempts

## Testing

To test the role-based access control:

1. **Run User Seeder**: `node scripts/seeders/authUserSeeder.cjs`
2. **Test Admin Access**: 
   - Login with `admin@t2soft.com` / `Admin123!`
   - Navigate to `/admin` - should work
3. **Test Regular User**:
   - Login with `test@example.com` / `Test123!` 
   - Navigate to `/admin` - should be denied and redirected

## Troubleshooting

### Common Issues:
1. **"User profile not found"**: User exists in Firebase Auth but not in Firestore
2. **"Email verification required"**: User needs to verify email (except admin)
3. **"Access denied"**: User doesn't have required role
4. **"Account deactivated"**: User account is marked as inactive

### Solutions:
- Ensure user seeder has run successfully
- Check Firestore for user profile documents
- Verify email verification status
- Confirm user role in Firestore document
