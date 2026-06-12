from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from .database import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(String(50), unique=True)
    customer_name = Column(String(100))
    customer_email = Column(String(100))
    subject = Column(String(255))
    description = Column(Text)
    status = Column(String(50), default="Open")
    notes = Column(Text, nullable=True)           # 👈 notes column
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())