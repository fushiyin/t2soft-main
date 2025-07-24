# Firebase Authentication Setup Guide

## 🔧 Email Verification System

### ✅ **NEW**: Email Verification Required

**Important**: All new user registrations now require email verification before login.

### How It Works:
1. **Registration**: User creates account → verification email sent → user signed out
2. **Email**: User clicks verification link in email → email verified
3. **Login**: User can now log in with verified email

### 🧪 Testing with Seeded Accounts

**Pre-verified accounts (can login immediately):**
- Email: `admin@t2soft.com` / Password: `Admin123!` ✅

**Unverified accounts (require email verification):**
- Email: `test@example.com` / Password: `Test123!` ⚠️

---

## 🔧 To Fix Google Login Issues

### 1. Enable Google Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/project/trading-76356/authentication/providers)
2. Click on **Sign-in method** tab
3. Find **Google** in the providers list
4. Click **Enable**
5. Add your project email in the **Project support email** field
6. Click **Save**

### 2. Configure Authorized Domains

1. In the same **Sign-in method** section
2. Scroll down to **Authorized domains**
3. Make sure these domains are added:
   - `localhost` (for development)
   - `trading-76356.firebaseapp.com` (your Firebase domain)
   - Your production domain (if applicable)

### 3. Test the Login

1. Open your app at `http://localhost:5175/`
2. Click on "Continue with Google"
3. A popup should open for Google authentication
4. After successful login, it should redirect to home page

### 🚨 Common Issues & Solutions

**Issue: "This app is blocked"**
- Solution: The app needs to be verified by Google for production use
- For development: Add test users in Google Cloud Console

**Issue: "Popup blocked"**
- Solution: Allow popups for your localhost domain
- Alternative: The error message will guide users

**Issue: "Unauthorized domain"**
- Solution: Add your domain to authorized domains list

**Issue: "Configuration not found"**
- Solution: Make sure Google provider is enabled in Firebase Console

### 🧪 Testing with Seeded Accounts

You can also test with the seeded accounts:
- Email: `admin@t2soft.com` / Password: `Admin123!`
- Email: `test@example.com` / Password: `Test123!`

### 📝 Current Features

✅ **Working:**
- Email/password login and registration
- **Email verification requirement for new accounts**
- **Resend verification email functionality**
- Google popup authentication
- Automatic Firestore profile creation
- Error handling and user feedback
- Form validation

✅ **Enhanced:**
- **Email verification enforcement**
- **Verification status UI with resend option**
- Better error messages
- User profile creation for both social and manual signups
- Last login tracking
- Proper Firebase integration

### 🚨 Common Email Verification Issues

**Issue: "Email not verified"**
- Solution: Check your email inbox and spam folder for verification link
- Alternative: Use "Resend Verification Email" button on login page

**Issue: "Verification link expired"**
- Solution: Request a new verification email from the login page

**Issue: "Already have account but can't login"**
- Solution: Your email needs verification. Enter password and use "Resend Verification Email"

---

**Next Steps:** 
1. Enable Google authentication in Firebase Console
2. Test email verification flow with new account registration
3. Test the login flow with verified accounts!
