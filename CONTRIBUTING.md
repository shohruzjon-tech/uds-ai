# Contributing to UDS GO

Thank you for your interest in contributing to UDS GO! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/shohruzjon-tech/uds-ai/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, etc.)

### Suggesting Enhancements

1. Check existing [Issues](https://github.com/shohruzjon-tech/uds-ai/issues) for similar suggestions
2. Create a new issue with:
   - Clear title and description
   - Use case and benefits
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes
4. Write or update tests
5. Ensure all tests pass
6. Commit with clear messages:
   ```bash
   git commit -m "Add amazing feature"
   ```
7. Push to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
8. Open a Pull Request

## Development Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
docker-compose up -d
npm run start:dev
```

### Mobile Apps

```bash
cd apps/client  # or apps/driver
npm install
npm start
```

### Admin Dashboard

```bash
cd admin
npm install
npm run dev
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Follow existing code style
- Use meaningful variable names
- Add comments for complex logic

### Commits

- Use conventional commit messages:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `style:` for formatting
  - `refactor:` for code restructuring
  - `test:` for adding tests
  - `chore:` for maintenance tasks

### Testing

- Write unit tests for business logic
- Write integration tests for APIs
- Ensure test coverage is maintained

## Project Structure

```
uds-go/
├── backend/          # NestJS backend
├── apps/
│   ├── client/      # Client mobile app
│   └── driver/      # Driver mobile app
└── admin/           # Admin dashboard
```

## Getting Help

- Join our [Telegram channel](https://t.me/udsgo)
- Email: support@udsgo.uz
- Check [Documentation](README.md)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
