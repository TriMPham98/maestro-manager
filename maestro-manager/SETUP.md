# Maestro Manager Setup Guide

## Node.js Version Requirement

Maestro Manager requires Node.js version 18.18.0 or later. You are currently running Node.js 18.16.0, which is not compatible with the latest version of Next.js.

## Upgrading Node.js

### Using nvm (Node Version Manager) - Recommended

If you have nvm installed, you can easily switch to a compatible Node.js version:

```bash
# Install Node.js 18.18.0
nvm install 18.18.0

# Use Node.js 18.18.0
nvm use 18.18.0
```

### Using Homebrew (macOS)

If you're using Homebrew on macOS:

```bash
# Update Homebrew
brew update

# Upgrade Node.js
brew upgrade node
```

### Direct Download

You can also download and install Node.js directly from the official website:

1. Visit [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
2. Download the LTS version (which should be compatible)
3. Run the installer and follow the instructions

## After Upgrading Node.js

Once you've upgraded Node.js to a compatible version, you can run the application:

```bash
# Install dependencies
npm install

# Install bcrypt (may require additional setup on some systems)
npm install bcrypt

# Initialize Prisma
npx prisma generate

# Create the database (SQLite)
npx prisma db push

# Start the development server
npm run dev
```

The application should now be accessible at [http://localhost:3000](http://localhost:3000).

## Project Structure

The project is organized as follows:

- `/src/app`: Main application code using Next.js App Router
  - `/dashboard`: Dashboard pages for authenticated users
  - `/students`: Student management pages
  - `/lessons`: Lesson scheduling pages
  - `/payments`: Payment tracking pages
  - `/settings`: User and application settings
- `/src/components`: Reusable UI components
- `/src/lib`: Utility functions and shared code
- `/src/types`: TypeScript type definitions
- `/prisma`: Database schema and migrations

## Database Setup

The project uses Prisma with SQLite for simplicity. The database file will be created at `prisma/dev.db` when you run `npx prisma db push`.

If you want to use a different database (PostgreSQL, MySQL, etc.), you'll need to update the `datasource` block in `prisma/schema.prisma` and the `DATABASE_URL` in `.env`.

## Authentication

The project uses NextAuth.js for authentication. The authentication flow is:

1. Register a new account at `/register`
2. Log in with your credentials at `/login`
3. Access protected routes like `/dashboard`

## Troubleshooting

### bcrypt Installation Issues

If you encounter issues installing bcrypt, you may need to install additional build tools:

#### Windows

```bash
npm install --global --production windows-build-tools
```

#### macOS

```bash
xcode-select --install
```

#### Linux

```bash
sudo apt-get install build-essential
```
