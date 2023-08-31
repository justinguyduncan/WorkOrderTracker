from app.models import db, environment, SCHEMA
from app.models.note import Note  # Import the Note model
from sqlalchemy import text  # Import the 'text' function

def seed_notes():
    note_1 = Note(
        content='This is a note for job 1',
        user_id=1,
        job_id=1
    )
    note_2 = Note(
        content='Another note for job 1',
        user_id=2,
        job_id=1
    )
    note_3 = Note(
        content='Note for job 2',
        user_id=3,
        job_id=2
    )
    note_4 = Note(
        content='Note for job 3',
        user_id=4,
        job_id=3
    )
    note_5 = Note(
        content='Note for job 4',
        user_id=5,
        job_id=4
    )

    db.session.add(note_1)
    db.session.add(note_2)
    db.session.add(note_3)
    db.session.add(note_4)
    db.session.add(note_5)

    db.session.commit()

def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
