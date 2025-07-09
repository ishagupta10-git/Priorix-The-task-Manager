# Email Service Installation

## Install Nodemailer (Optional)

If you want to enable actual email sending, install nodemailer:

```bash
npm install nodemailer
```

## Environment Variables

Add these to your `.env` file:

```env
# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@taskmanager.com
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Required
JWT_SECRET=your-jwt-secret-key
NODE_ENV=development
```

## Email Service Options

### 1. Gmail (Production)
- Use Gmail SMTP
- Requires app-specific password
- Set `EMAIL_SERVICE=gmail`

### 2. Mailtrap (Development)
- Perfect for testing
- No real emails sent
- Set `EMAIL_HOST=smtp.mailtrap.io`

### 3. SendGrid (Production)
- Professional email service
- High deliverability
- Requires API key

### 4. Console Only (Development)
- No email service needed
- Reset links logged to console
- Default behavior

## Testing

Without email service:
- Reset links appear in server console
- Copy link to test reset functionality
- Perfect for development

With email service:
- Real emails sent to users
- Professional email templates
- Production-ready
