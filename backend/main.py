from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sqlalchemy.orm import Session
from database import get_db
from models import Employee, Product

app = FastAPI()

# Configure CORS (Cross-Origin Resource Sharing)
# This is crucial for allowing your React frontend (on a different port/origin)
# to make requests to your FastAPI backend.
origins = [
    "http://localhost:3000",  # Replace with your React app's URL
    "http://localhost:5173",  # If using Vite (common with React)
    # Add other origins if your frontend is deployed elsewhere
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Pydantic models for request/response validation
class EmployeeCreate(BaseModel):
    first_name: str
    last_name: str
    role: str
    is_active: bool = True

class EmployeeUpdate(BaseModel):
    first_name: str = None
    last_name: str = None
    role: str = None
    is_active: bool = None

class EmployeeResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    role: str
    is_active: bool

    class Config:
        from_attributes = True

# Product Pydantic models
class ProductCreate(BaseModel):
    name: str
    price: float
    category: str
    is_available: bool = True

class ProductUpdate(BaseModel):
    name: str = None
    price: float = None
    category: str = None
    is_available: bool = None

class ProductResponse(BaseModel):
    id: int
    name: str
    price: float
    category: str
    is_available: bool

    class Config:
        from_attributes = True

@app.get("/")
async def read_root():
    return {"message": "Hello from FastAPI!"}

# Employee endpoints
@app.get("/api/employees", response_model=List[EmployeeResponse])
async def get_employees(db: Session = Depends(get_db)):
    employees = db.query(Employee).all()
    return employees

@app.post("/api/employees", response_model=dict)
async def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    # Create new employee in database
    db_employee = Employee(
        first_name=employee.first_name,
        last_name=employee.last_name,
        role=employee.role,
        is_active=employee.is_active
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    
    print(f"Created employee: {db_employee.id} - {db_employee.first_name} {db_employee.last_name}")
    return {
        "message": "Employee created successfully!", 
        "data": {
            "id": db_employee.id,
            "first_name": db_employee.first_name,
            "last_name": db_employee.last_name,
            "role": db_employee.role,
            "is_active": db_employee.is_active
        }
    }

@app.get("/api/employees/{employee_id}", response_model=EmployeeResponse)
async def get_employee(employee_id: int, db: Session = Depends(get_db)):
    db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    return db_employee

@app.put("/api/employees/{employee_id}", response_model=dict)
async def update_employee(employee_id: int, employee: EmployeeUpdate, db: Session = Depends(get_db)):
    # Find the employee by ID
    db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Update only provided fields
    if employee.first_name is not None:
        db_employee.first_name = employee.first_name
    if employee.last_name is not None:
        db_employee.last_name = employee.last_name
    if employee.role is not None:
        db_employee.role = employee.role
    if employee.is_active is not None:
        db_employee.is_active = employee.is_active
    
    db.commit()
    db.refresh(db_employee)
    
    print(f"Updated employee: {db_employee.id} - {db_employee.first_name} {db_employee.last_name}")
    return {
        "message": "Employee updated successfully!", 
        "data": {
            "id": db_employee.id,
            "first_name": db_employee.first_name,
            "last_name": db_employee.last_name,
            "role": db_employee.role,
            "is_active": db_employee.is_active
        }
    }

@app.delete("/api/employees/{employee_id}", response_model=dict)
async def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    # Find the employee by ID
    db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Delete the employee
    db.delete(db_employee)
    db.commit()
    
    print(f"Deleted employee: {db_employee.id} - {db_employee.first_name} {db_employee.last_name}")
    return {
        "message": "Employee deleted successfully!", 
        "data": {
            "id": db_employee.id,
            "first_name": db_employee.first_name,
            "last_name": db_employee.last_name,
            "role": db_employee.role,
            "is_active": db_employee.is_active
        }
    }

# Product endpoints
@app.get("/api/products", response_model=List[ProductResponse])
async def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products

@app.post("/api/products", response_model=dict)
async def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    # Create new product in database
    db_product = Product(
        name=product.name,
        price=product.price,
        category=product.category,
        is_available=product.is_available
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    
    print(f"Created product: {db_product.id} - {db_product.name}")
    return {
        "message": "Product created successfully!", 
        "data": {
            "id": db_product.id,
            "name": db_product.name,
            "price": db_product.price,
            "category": db_product.category,
            "is_available": db_product.is_available
        }
    }

@app.get("/api/products/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return db_product

@app.put("/api/products/{product_id}", response_model=dict)
async def update_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    # Find the product by ID
    db_product = db.query(Product).filter(Product.id == product_id).first()
    
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Update only provided fields
    if product.name is not None:
        db_product.name = product.name
    if product.price is not None:
        db_product.price = product.price
    if product.category is not None:
        db_product.category = product.category
    if product.is_available is not None:
        db_product.is_available = product.is_available
    
    db.commit()
    db.refresh(db_product)
    
    print(f"Updated product: {db_product.id} - {db_product.name}")
    return {
        "message": "Product updated successfully!", 
        "data": {
            "id": db_product.id,
            "name": db_product.name,
            "price": db_product.price,
            "category": db_product.category,
            "is_available": db_product.is_available
        }
    }

@app.delete("/api/products/{product_id}", response_model=dict)
async def delete_product(product_id: int, db: Session = Depends(get_db)):
    # Find the product by ID
    db_product = db.query(Product).filter(Product.id == product_id).first()
    
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Delete the product
    db.delete(db_product)
    db.commit()
    
    print(f"Deleted product: {db_product.id} - {db_product.name}")
    return {
        "message": "Product deleted successfully!", 
        "data": {
            "id": db_product.id,
            "name": db_product.name,
            "price": db_product.price,
            "category": db_product.category,
            "is_available": db_product.is_available
        }
    }