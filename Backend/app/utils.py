import random

def generate_ticket_id():
    return f"TKT-{random.randint(1000,9999)}"