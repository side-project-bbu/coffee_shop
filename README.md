# Coffee Shop Management System

A modern coffee shop management system built with React frontend and FastAPI backend. This application provides a comprehensive solution for managing employees, products, orders, and analytics for your coffee shop business.

## 🚀 Features

- **Employee Management**: Add, edit, and manage employee information
- **Product Catalog**: Manage your coffee shop menu and products
- **Order History**: View and track customer orders
- **Analytics Dashboard**: Monitor business performance and insights
- **Responsive Design**: Modern UI with Tailwind CSS
- **Real-time Updates**: Seamless communication between frontend and backend

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **ESLint** - Code linting and formatting

### Backend
- **FastAPI** - Modern, fast web framework for building APIs with Python
- **SQLAlchemy** - SQL toolkit and Object-Relational Mapping (ORM)
- **SQLite** - Lightweight database for development
- **Pydantic** - Data validation using Python type annotations

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **Python** (version 3.8 or higher) - [Download here](https://python.org/)
- **npm** or **yarn** (comes with Node.js)
- **Git** (optional, for cloning the repository)

## 🚀 Getting Started

Follow these steps to get the project running on your local machine:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd React-FastAPI
```

### 2. Backend Setup (FastAPI)

#### Navigate to the backend directory:
```bash
cd backend
```

#### Create a virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### Install Python dependencies:
```bash
pip install fastapi uvicorn sqlalchemy pydantic
```

#### Start the FastAPI development server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at: `http://localhost:8000`

You can view the interactive API documentation at: `http://localhost:8000/docs`

### 3. Frontend Setup (React)

#### Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

#### Install Node.js dependencies:
```bash
npm install
```

#### Start the React development server:
```bash
npm run dev
```

The frontend application will be available at: `http://localhost:5173`

## 🗄️ Database

The application uses SQLite as the database, which is automatically created when you first run the backend server. The database file (`coffee_shop.db`) will be created in the `backend` directory.

### Database Schema

- **Employees**: Stores employee information (id, first_name, last_name, role, is_active)

## 📁 Project Structure

```
React-FastAPI/
├── README.md
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── database.py          # Database configuration and connection
│   ├── models.py            # SQLAlchemy database models
│   ├── coffee_shop.db       # SQLite database file (auto-generated)
│   └── __pycache__/         # Python cache files
├── frontend/
│   ├── package.json         # Node.js dependencies and scripts
│   ├── vite.config.js       # Vite configuration
│   ├── eslint.config.js     # ESLint configuration
│   ├── index.html           # HTML template
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── main.jsx         # React entry point
│   │   ├── index.css        # Global styles
│   │   ├── components/
│   │   │   └── Header.jsx   # Header component
│   │   ├── pages/
│   │   │   └── employee.jsx # Employee management page
│   │   └── assets/
│   │       └── react.svg    # React logo
│   └── public/
│       └── vite.svg         # Vite logo
└── coffee_DB.png            # Database schema diagram
```

## 🔧 Development Commands

### Backend Commands (from `backend/` directory)
```bash
# Start development server
uvicorn main:app --reload

# Start with custom host/port
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Commands (from `frontend/` directory)
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```



**Happy coding! ☕️**
