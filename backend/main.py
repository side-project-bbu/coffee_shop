from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models import Employee, Product, Supplier, Category, Role

app = FastAPI()

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models

# New Role schemas
class RoleBase(BaseModel):
    name: str

class RoleCreate(RoleBase):
    pass

class RoleUpdate(BaseModel):
    name: Optional[str] = None

class RoleResponse(RoleBase):
    id: int
    class Config:
        from_attributes = True

# Updated Employee schemas
class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    role_id: int
    is_active: bool = True

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    role_id: Optional[int] = None
    is_active: Optional[bool] = None

class EmployeeResponse(EmployeeBase):
    id: int
    role: RoleResponse = Field(..., alias="role_obj")
    class Config:
        from_attributes = True

class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = None

class CategoryResponse(CategoryBase):
    id: int

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    price: float
    is_available: bool = True

class ProductCreate(ProductBase):
    category_id: int

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    category_id: Optional[int] = None
    is_available: Optional[bool] = None

class ProductResponse(ProductBase):
    id: int
    category: CategoryResponse

    class Config:
        from_attributes = True

class SupplierBase(BaseModel):
    name: str
    phone_number: str

class SupplierCreate(SupplierBase):
    pass

class SupplierUpdate(BaseModel):
    name: Optional[str] = None
    phone_number: Optional[str] = None

class SupplierResponse(SupplierBase):
    id: int

    class Config:
        from_attributes = True

# Root endpoint
@app.get("/")
async def read_root():
    return {"message": "Hello from FastAPI!"}

# Category Endpoints
@app.post("/api/categories", response_model=CategoryResponse)
async def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    db_category = Category(name=category.name)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@app.get("/api/categories", response_model=List[CategoryResponse])
async def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()

@app.get("/api/categories/{category_id}", response_model=CategoryResponse)
async def get_category(category_id: int, db: Session = Depends(get_db)):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_category

@app.put("/api/categories/{category_id}", response_model=CategoryResponse)
async def update_category(category_id: int, category: CategoryUpdate, db: Session = Depends(get_db)):
    db_category = get_category(category_id, db)
    update_data = category.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_category, key, value)
    db.commit()
    db.refresh(db_category)
    return db_category

@app.delete("/api/categories/{category_id}", response_model=dict)
async def delete_category(category_id: int, db: Session = Depends(get_db)):
    db_category = get_category(category_id, db)
    db.delete(db_category)
    db.commit()
    return {"message": "Category deleted successfully"}

# Product Endpoints
@app.post("/api/products", response_model=ProductResponse)
async def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.get("/api/products", response_model=List[ProductResponse])
async def get_products(db: Session = Depends(get_db)):
    return db.query(Product).options(joinedload(Product.category)).all()

@app.get("/api/products/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).options(joinedload(Product.category)).filter(Product.id == product_id).first()
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@app.put("/api/products/{product_id}", response_model=ProductResponse)
async def update_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    db_product = get_product(product_id, db)
    update_data = product.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.delete("/api/products/{product_id}", response_model=dict)
async def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = get_product(product_id, db)
    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted successfully"}

# Updated Employee Endpoints
@app.post("/api/employees", response_model=EmployeeResponse)
async def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    db_employee = Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@app.get("/api/employees", response_model=List[EmployeeResponse])
async def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).options(joinedload(Employee.role_obj)).all()

@app.get("/api/employees/{employee_id}", response_model=EmployeeResponse)
async def get_employee(employee_id: int, db: Session = Depends(get_db)):
    db_employee = db.query(Employee).options(joinedload(Employee.role_obj)).filter(Employee.id == employee_id).first()
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_employee

@app.put("/api/employees/{employee_id}", response_model=EmployeeResponse)
async def update_employee(employee_id: int, employee: EmployeeUpdate, db: Session = Depends(get_db)):
    db_employee = get_employee(employee_id, db)
    update_data = employee.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_employee, key, value)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@app.delete("/api/employees/{employee_id}", response_model=dict)
async def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    db_employee = get_employee(employee_id, db)
    db.delete(db_employee)
    db.commit()
    return {"message": "Employee deleted successfully"}

# Supplier Endpoints
@app.post("/api/suppliers", response_model=SupplierResponse)
async def create_supplier(supplier: SupplierCreate, db: Session = Depends(get_db)):
    db_supplier = Supplier(**supplier.dict())
    db.add(db_supplier)
    db.commit()
    db.refresh(db_supplier)
    return db_supplier

@app.get("/api/suppliers", response_model=List[SupplierResponse])
async def get_suppliers(db: Session = Depends(get_db)):
    return db.query(Supplier).all()

@app.get("/api/suppliers/{supplier_id}", response_model=SupplierResponse)
async def get_supplier(supplier_id: int, db: Session = Depends(get_db)):
    db_supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if db_supplier is None:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return db_supplier

@app.put("/api/suppliers/{supplier_id}", response_model=SupplierResponse)
async def update_supplier(supplier_id: int, supplier: SupplierUpdate, db: Session = Depends(get_db)):
    db_supplier = get_supplier(supplier_id, db)
    update_data = supplier.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_supplier, key, value)
    db.commit()
    db.refresh(db_supplier)
    return db_supplier

@app.delete("/api/suppliers/{supplier_id}", response_model=dict)
async def delete_supplier(supplier_id: int, db: Session = Depends(get_db)):
    db_supplier = get_supplier(supplier_id, db)
    db.delete(db_supplier)
    db.commit()
    return {"message": "Supplier deleted successfully"}

# New Role Endpoints
@app.post("/api/roles", response_model=RoleResponse)
async def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    db_role = Role(**role.dict())
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role

@app.get("/api/roles", response_model=List[RoleResponse])
async def get_roles(db: Session = Depends(get_db)):
    return db.query(Role).all()

@app.get("/api/roles/{role_id}", response_model=RoleResponse)
async def get_role(role_id: int, db: Session = Depends(get_db)):
    db_role = db.query(Role).filter(Role.id == role_id).first()
    if db_role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    return db_role

@app.put("/api/roles/{role_id}", response_model=RoleResponse)
async def update_role(role_id: int, role: RoleUpdate, db: Session = Depends(get_db)):
    db_role = get_role(role_id, db)
    update_data = role.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_role, key, value)
    db.commit()
    db.refresh(db_role)
    return db_role

@app.delete("/api/roles/{role_id}", response_model=dict)
async def delete_role(role_id: int, db: Session = Depends(get_db)):
    db_role = get_role(role_id, db)
    db.delete(db_role)
    db.commit()
    return {"message": "Role deleted successfully"}
