# Coffee Shop Management System Document 

A comprehensive coffee shop management system featuring dual frontends (React for customers and Vue.js for admin) with a powerful FastAPI backend. This full-stack application provides complete solutions for managing employees, products, suppliers, orders, and business analytics.

## � Project Summary

This coffee shop management system offers:
- **Customer Interface**: Modern React-based frontend for customer interactions
- **Admin Dashboard**: Vue.js-powered admin panel for comprehensive business management
- **Robust Backend**: FastAPI server with SQLite database for reliable data management
- **Real-time Operations**: Seamless communication between all components
- **Scalable Architecture**: Modular design for easy expansion and maintenance

## 🛠️ Tools and Frameworks

### Frontend (Customer Interface)
- **React 19** - Modern JavaScript library for building user interfaces
- **Vite 7** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework for responsive design
- **ESLint** - Code linting and quality assurance

### Admin Panel
- **Vue.js 3** - Progressive JavaScript framework for admin interface
- **Vue Router 4** - Official router for Vue.js applications
- **Vite 7** - Development server and build tool
- **Tailwind CSS 4** - Consistent styling across admin panel
- **Axios** - HTTP client for API communication

### Backend
- **FastAPI** - Modern, fast web framework for building APIs with Python
- **SQLAlchemy 2** - SQL toolkit and Object-Relational Mapping (ORM)
- **SQLite** - Lightweight, serverless database engine
- **Pydantic 2** - Data validation using Python type annotations
- **Uvicorn** - ASGI server for running FastAPI applications

### Development Tools
- **ESLint** - JavaScript/TypeScript linting
- **Vite** - Build tooling for both frontends
- **Python Virtual Environment** - Isolated Python package management

## 🚀 How to Run the Project

### Prerequisites
- **Node.js** (version 18 or higher)
- **Python** (version 3.8 or higher)
- **npm** (comes with Node.js)

### Quick Start (Frontend Applications)

Install frontend dependencies:
```bash
npm install
```

Run both frontend applications with one command:
```bash
npm run dev
```

This will start:
- **Frontend (React)**: `http://localhost:5173`
- **Admin Panel (Vue.js)**: `http://localhost:5174`

### Backend Setup (Run Separately)

For the backend, you'll need to run it separately in its own terminal:

### 1. Backend Setup (FastAPI)

Navigate to the backend directory:
```bash
cd backend
```

Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Start the FastAPI development server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend API will be available at: `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

### 2. Frontend Setup (Customer Interface)

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the React development server:
```bash
npm run dev
```

Customer frontend will be available at: `http://localhost:5173`

### 3. Admin Panel Setup

Open another terminal and navigate to the admin directory:
```bash
cd admin
```

Install dependencies:
```bash
npm install
```

Start the Vue.js development server:
```bash
npm run dev
```

Admin panel will be available at: `http://localhost:5174`

## 🗄️ Database

The application uses SQLite as the database, which is automatically created when you first run the backend server. The database file (`coffee_shop.db`) will be created in the `backend` directory.

## 📁 Project Structure

```
React-FastAPI/
├── README.md
├── backend/                 # FastAPI Backend
│   ├── main.py             # FastAPI application entry point
│   ├── database.py         # Database configuration and connection
│   ├── models.py           # SQLAlchemy database models
│   ├── requirements.txt    # Python dependencies
│   ├── coffee_shop.db      # SQLite database file (auto-generated)
│   └── __pycache__/        # Python cache files
├── frontend/               # React Customer Interface
│   ├── package.json        # Node.js dependencies and scripts
│   ├── vite.config.js      # Vite configuration
│   ├── eslint.config.js    # ESLint configuration
│   ├── index.html          # HTML template
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── main.jsx        # React entry point
│   │   ├── index.css       # Global styles
│   │   ├── components/     # Reusable React components
│   │   └── pages/          # Page components
│   └── public/             # Static assets
├── admin/                  # Vue.js Admin Panel
│   ├── package.json        # Node.js dependencies
│   ├── vite.config.js      # Vite configuration
│   ├── index.html          # HTML template
│   ├── src/
│   │   ├── App.vue         # Main Vue component
│   │   ├── main.js         # Vue entry point
│   │   ├── components/     # Vue components
│   │   ├── pages/          # Admin page components
│   │   └── router/         # Vue Router configuration
│   └── public/             # Static assets
└── coffee_DB.png           # Database schema diagram
```

**Happy coding! ☕️**
