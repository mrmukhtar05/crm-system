from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas import TicketCreate, TicketUpdate, TicketResponse
from app.database import SessionLocal
from app.models import Ticket
from datetime import datetime
import uuid

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/tickets", response_model=list[TicketResponse])
def get_tickets(db: Session = Depends(get_db)):
    return db.query(Ticket).all()

@router.post("/tickets", response_model=TicketResponse)
def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    # Handle notes: default "No notes" if empty or None
    notes_value = "No notes"
    if hasattr(ticket, 'notes') and ticket.notes and ticket.notes.strip():
        notes_value = ticket.notes.strip()

    new_ticket = Ticket(
        ticket_id="TKT-" + str(uuid.uuid4())[:6].upper(),
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        status="Open",
        notes=notes_value,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket

@router.get("/tickets/{id}", response_model=TicketResponse)
def get_ticket_by_id(id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == id).first()
    if not ticket:
        raise HTTPException(404, "Ticket not found")
    return ticket

@router.put("/tickets/{id}", response_model=TicketResponse)
def update_ticket_by_id(id: int, data: TicketUpdate, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == id).first()
    if not ticket:
        raise HTTPException(404, "Ticket not found")
    
    ticket.status = data.status
    if data.notes is not None:
        ticket.notes = data.notes
    
    ticket.updated_at = datetime.now()
    db.commit()
    db.refresh(ticket)
    return ticket

# ✅ New endpoint: Fix all null notes
@router.post("/tickets/fix-notes")
def fix_null_notes(db: Session = Depends(get_db)):
    updated_count = db.query(Ticket).filter(Ticket.notes.is_(None)).update(
        {Ticket.notes: "No notes"}, synchronize_session=False
    )
    db.commit()
    return {"message": f"✅ {updated_count} tickets updated with 'No notes'"}