from app.models import db, environment, SCHEMA
from app.models.department import Department  # Import the Department model
from sqlalchemy import text  # Import the 'text' function

def seed_departments():
    admin = Department(name='Administrator')
    color = Department(name='Large Color')
    ldc = Department(name='Large Document')
    sdc = Department(name='Small Document')
    dispatch = Department(name='Dispatch')

    db.session.add(admin)
    db.session.add(color)
    db.session.add(ldc)
    db.session.add(sdc)
    db.session.add(dispatch)

    db.session.commit()

def undo_departments():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.departments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM departments"))

    db.session.commit()
