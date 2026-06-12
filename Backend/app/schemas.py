from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class TicketCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str
    notes: Optional[str] = None          # 👈 ADD THIS LINE

class TicketUpdate(BaseModel):
    status: str
    notes: Optional[str] = None

class TicketResponse(BaseModel):
    id: int
    ticket_id: str
    customer_name: str
    customer_email: str
    subject: str
    description: str
    status: str
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True