# MediTrack - Patient Management System

## Overview

MediTrack is a full-stack patient registration and management system built with React, Django, and PostgreSQL. The system provides secure user authentication, patient registration, and profile management capabilities through a modern web interface.

## Features

-   Patient registration with data validation
-   Token-based authentication system
-   Secure password management
-   Patient profile dashboard
-   Profile information updates
-   Responsive design with Tailwind CSS

## Tech Stack

### Frontend

-   React with TypeScript
-   Tailwind CSS for styling
-   Vite for build tooling
-   Axios for API requests
-   React Router for navigation

### Backend

-   Django 4.2
-   Django REST Framework
-   PostgreSQL Database
-   JWT Authentication via SimpleJWT
-   Django CORS headers
-   Whitenoise for static file serving

## Project Structure

```
meditrack/
├── Backend/
│   ├── api/               # Django app
│   │   ├── models.py      # User and Patient models
│   │   ├── serializers.py # Data serialization
│   │   ├── urls.py       # API endpoints
│   │   └── views.py      # API logic
│   ├── backend/          # Django project
│   │   ├── settings.py   # Project settings
│   │   └── urls.py      # URL routing
│   ├── manage.py
│   └── staticfiles/      # Collected static files
├── Frontend/
│   ├── src/             # React source code
│   │   ├── assets/        # React components
│   │   ├── features/      # Redux setup
│   │   ├── pages/      # Page components
│   │   ├── utilities/   # Utility functions
│   ├── public/         # Static assets
│   ├── index.html      # HTML template
│   └── package.json    # Dependencies
└── requirements.txt    # Python dependencies
```

## API Endpoints

```
POST   /api/auth/register/     # Patient registration
POST   /api/auth/login/        # User authentication
GET    /api/patients/profile/  # Get patient profile
PUT    /api/patients/profile/  # Update patient profile
```

# MediTrack - Patient Management System

## Setup Instructions

### Prerequisites

-   Python 3.8+
-   Node.js 16+
-   PostgreSQL 14+

### Development Setup

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/meditrack.git
cd meditrack
```

#### 2. Set up PostgreSQL Database

```bash
# Update package list and install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib -y

# Switch to PostgreSQL system account
sudo -i -u postgres

# Create database and user (run in psql prompt)
psql
CREATE DATABASE m_treat_db;
CREATE USER m_treat_user WITH PASSWORD 'your_password';

# Configure user settings
ALTER ROLE m_treat_user SET client_encoding TO 'utf8';
ALTER ROLE m_treat_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE m_treat_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE m_treat_db TO m_treat_user;

# Exit PostgreSQL prompt
\q
exit
```

#### 3. Set up Backend

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install dependencies
pip install -r requirements.txt
pip install psycopg2-binary  # PostgreSQL adapter for Python

# Generate Django secret key
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'

# Configure environment
cd Backend
cp .env.example .env  # Create and edit .env file with following template:
```

Create `.env` file in the root directory:

```
DEBUG=True
SECRET_KEY='your_generated_secret_key'

DB_NAME='m_treat_db'
DB_USER='m_treat_user'
DB_PASSWORD='your_password'
DB_HOST='localhost'
DB_PORT='5432'

BASE_URL='http://localhost:8000/api'
```

```bash
# Initialize database
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

#### 4. Set up Frontend

```bash
cd Frontend
npm install
npm run dev
```

### PostgreSQL Troubleshooting

#### Permission Issues

If you encounter database permission issues:

```bash
sudo -u postgres psql
ALTER USER m_treat_user CREATEDB;
\q
```

#### Connection Issues

If Django can't connect to PostgreSQL:

1. Check PostgreSQL service status:

```bash
sudo systemctl status postgresql
```

2. Verify connection settings in pg_hba.conf:

```bash
sudo nano /etc/postgresql/[version]/main/pg_hba.conf
# Add or modify:
# local   all             all                                     md5
```

3. Ensure PostgreSQL is listening:

```bash
sudo nano /etc/postgresql/[version]/main/postgresql.conf
# Uncomment and set:
# listen_addresses = 'localhost'
```

#### Database Reset

If you need to reset the database:

```bash
sudo -u postgres psql
DROP DATABASE m_treat_db;
CREATE DATABASE m_treat_db;
GRANT ALL PRIVILEGES ON DATABASE m_treat_db TO m_treat_user;
\q
```

### Production Deployment


1. Clone the repository

```bash
git clone https://github.com/yourusername/meditrack.git
cd meditrack
```

2. Set up backend

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cd Backend
cp .env.example .env  # Create and edit .env file

# Initialize database
python manage.py migrate
python manage.py runserver
```

3. Set up frontend

```bash
cd Frontend
npm install
npm run dev
```

4. Configure environment variables
   Create a `.env` file in the Backend directory:

```
DEBUG=True
SECRET_KEY=your-secret-key
DB_NAME=meditrack_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
```

### Production Deployment

1. Build frontend

```bash
cd Frontend
npm run build
```

2. Set up Django static files

```bash
cd Backend
python manage.py collectstatic --noinput
```

3. Update settings for production

-   Set DEBUG=False in .env
-   Configure allowed hosts
-   Set up proper database credentials
-   Configure proper CORS settings

## Security Features

-   Password hashing using Django's authentication system
-   JWT token-based authentication
-   CORS configuration for API security
-   Input validation on both frontend and backend
-   Protection against CSRF attacks
-   SQL injection prevention through Django ORM
-   Whitenoise for secure static file serving

## Static Files Configuration

The project uses Whitenoise for serving static files in both development and production:

1. Static files are collected from Frontend/dist
2. Whitenoise middleware handles compression and caching
3. MIME types are properly configured for all static assets
4. Assets are served with proper security headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## Acknowledgments

-   Built for M-TREAT
-   Uses Tailwind CSS for styling
-   Implements React and Django best practices
-   Uses Whitenoise for efficient static file serving

## Known Issues

-   If you encounter MIME type errors with static files, ensure you've:
    1. Run `python manage.py collectstatic`
    2. Configured Whitenoise correctly
    3. Built the frontend with `npm run build`
    4. Cleared browser cache
