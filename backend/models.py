from sqlalchemy import Column, Integer, String, Boolean, Float
from database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    def __repr__(self):
        return f"<Employee(id={self.id}, first_name='{self.first_name}', last_name='{self.last_name}', role='{self.role}', is_active={self.is_active})>"

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)  # Use Float for decimal prices
    category = Column(String, nullable=False)
    is_available = Column(Boolean, default=True, nullable=False)

    def __repr__(self):
        return f"<Product(id={self.id}, name='{self.name}', price={self.price}, category='{self.category}', is_available={self.is_available})>"