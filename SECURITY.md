# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Publicly Disclose

Please do not create a public GitHub issue for security vulnerabilities.

### 2. Report Privately

Send details to: security@udsgo.uz

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### 3. Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Fix Timeline**: Depends on severity
  - Critical: 1-7 days
  - High: 7-30 days
  - Medium: 30-90 days
  - Low: Best effort

### 4. Disclosure Process

1. We confirm the vulnerability
2. We develop and test a fix
3. We release a security update
4. We publicly disclose the vulnerability after users have time to update

## Security Best Practices

### For Developers

- Never commit credentials or secrets
- Use environment variables for sensitive data
- Keep dependencies updated
- Run security audits regularly: `npm audit`
- Use HTTPS in production
- Implement proper authentication and authorization
- Validate and sanitize all inputs
- Use prepared statements for database queries

### For Users

- Use strong, unique passwords
- Enable 2FA where available
- Keep your apps updated
- Don't share your credentials
- Report suspicious activity

## Known Security Considerations

### Authentication
- OTP codes expire after 5 minutes
- JWT tokens expire after 7 days
- Password hashing uses bcrypt

### Data Protection
- All API communications use HTTPS in production
- Database connections are encrypted
- Payment data is handled via secure gateways (PAYME, CLICK)

### Rate Limiting
- API endpoints are rate-limited
- Failed login attempts are tracked
- Suspicious activity triggers alerts

## Security Tools

We use:
- npm audit for dependency scanning
- ESLint for code security checks
- GitHub Security Advisories
- Regular penetration testing

## Compliance

- GDPR considerations for user data
- PCI DSS compliance for payment handling
- Local regulations for Uzbekistan market

## Contact

For security concerns:
- Email: security@udsgo.uz
- PGP Key: Available on request
- Response time: 48 hours or less

Thank you for helping keep UDS GO secure!
