from sqlalchemy import Column, Integer, String, Boolean
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