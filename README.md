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

-   React 18
-   Redux Toolkit for state management
-   Axios for API requests
-   Tailwind CSS for styling
-   React Router for navigation

### Backend

-   Django 4.2
-   Django REST Framework
-   PostgreSQL 14
-   JWT Authentication
-   Django CORS headers

## Project Structure

```
meditrack/
├── backend/
│   ├── api/
│   │   ├── models.py       # Patient and user models
│   │   ├── serializers.py  # Data serialization
│   │   ├── urls.py        # API endpoints
│   │   └── views.py       # API logic
│   ├── backend/
│   │   ├── settings.py    # Django configuration
│   │   └── urls.py        # Main URL routing
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── features/      # Redux slices
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── store/        # Redux store
│   └── package.json
└── requirements.txt
```

## API Endpoints

```
POST   /api/register/     # Patient registration
POST   /api/login/        # User authentication
GET    /api/profile/      # Get patient profile
PUT    /api/profile/      # Update patient profile
```

## Setup Instructions

### Prerequisites

-   Python 3.8+
-   Node.js 16+
-   PostgreSQL 14+

### Development Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/meditrack.git
cd meditrack
```

2. Set up backend

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd backend
python manage.py migrate
python manage.py runserver
```

3. Set up frontend

```bash
cd frontend
npm install
npm start
```

4. Configure environment variables
   Create a `.env` file in the backend directory:

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
cd frontend
npm run build
```

2. Configure Django static files

```bash
cd backend
python manage.py collectstatic
```

3. Set up Gunicorn and Nginx

```bash
gunicorn backend.wsgi:application
```

## Security Features

-   Password hashing using Django's authentication system
-   JWT token-based authentication
-   CORS configuration for API security
-   Input validation on both frontend and backend
-   Protection against CSRF attacks
-   SQL injection prevention through Django ORM

## Data Flow

1. User submits registration form
2. Frontend validates input
3. Data sent to Django backend
4. Backend validates and processes data
5. User data stored in PostgreSQL
6. JWT token generated and returned
7. Token stored in Redux store
8. User redirected to dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## Testing

### Backend Tests

```bash
python manage.py test
```

### Frontend Tests

```bash
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

-   Built for M-TREAT
-   Uses Tailwind CSS for styling
-   Implements best practices for React and Django development
