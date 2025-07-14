from sqlalchemy import Column, Integer, String, Boolean, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False, unique=True)

    employees = relationship("Employee", back_populates="role_obj")

    def __repr__(self):
        return f"<Role(id={self.id}, name='{self.name}')>"

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    role_obj = relationship("Role", back_populates="employees")

    def __repr__(self):
        return f"<Employee(id={self.id}, first_name='{self.first_name}', last_name='{self.last_name}', role_id={self.role_id}, is_active={self.is_active})>"

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False, unique=True)

    products = relationship("Product", back_populates="category")

    def __repr__(self):
        return f"<Category(id={self.id}, name='{self.name}')>"

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"))
    is_available = Column(Boolean, default=True, nullable=False)

    category = relationship("Category", back_populates="products")

    def __repr__(self):
        return f"<Product(id={self.id}, name='{self.name}', price={self.price}, category_id={self.category_id}, is_available={self.is_available})>"

class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(Text, nullable=False)
    phone_number = Column(Text, nullable=False)

    def __repr__(self):
        return f"<Supplier(id={self.id}, name='{self.name}', phone_number='{self.phone_number}')>"