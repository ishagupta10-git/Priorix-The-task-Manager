# Profile Edit Modal

## Overview
The ProfileEditModal component provides a user-friendly interface for users to edit their profile information directly from the dashboard header.

## Features
- **Easy Access**: Profile edit icon in the dashboard header
- **Responsive Design**: Works on both desktop and mobile devices
- **Form Validation**: Client-side validation for all fields
- **Real-time Feedback**: Loading states and success/error messages
- **Password Update**: Optional password change functionality
- **Profile Image Display**: Shows current profile image or default avatar

## Usage

### Accessing the Profile Edit Modal
1. Look for the edit icon (pencil) in the top-right corner of the dashboard header
2. Click the edit icon to open the profile edit modal

### Editing Profile Information
1. **Name**: Update your full name
2. **Email**: Change your email address
3. **Password**: Optionally update your password
   - Leave blank to keep current password
   - Must be at least 6 characters if provided
   - Confirm password field appears when password is entered

### Form Validation
- Name is required
- Email must be valid format
- Password must be at least 6 characters (if provided)
- Confirm password must match new password

### Saving Changes
1. Fill in the desired changes
2. Click "Save Changes" button
3. Wait for the success confirmation
4. Modal will automatically close after successful update

## Technical Implementation

### Components Used
- `ProfileEditModal.jsx` - Main modal component
- `Input.jsx` - Reusable input component
- React Icons (Feather Icons)
- React Hot Toast for notifications

### API Integration
- **Endpoint**: `PUT /api/auth/profile`
- **Authentication**: Requires JWT token
- **Request Body**: `{ name, email, password? }`
- **Response**: Updated user object with new JWT token

### State Management
- Uses React Context (`UserContext`) for user state
- Local state for form data and UI states
- Automatic token refresh on successful update

## Styling
- Tailwind CSS for responsive design
- Gradient backgrounds and hover effects
- Loading spinners and success animations
- Mobile-first responsive approach

## Error Handling
- Client-side validation with real-time feedback
- Server error handling with user-friendly messages
- Network error handling
- Form reset on errors

## Security Features
- JWT token validation
- Password hashing on backend
- Input sanitization
- CSRF protection through API design
