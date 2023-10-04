from app.models import db, environment, SCHEMA
from app.models.job import Job  # Import the Job model
from sqlalchemy import text  # Import the 'text' function

def seed_jobs():
    job_1 = Job(
        title='Job Title 1',
        po_number=123456,
        description='Description of job 1',
        status='Hold',
        department_id=3
    )
    job_2 = Job(
        title='Job Title 2',
        po_number=789012,
        description='Description of job 2',
        status='In Progress',
        department_id=2
    )
    job_3 = Job(
        title='Job Title 3',
        po_number=111111,
        description='Description of job 3',
        status='Design',
        department_id=1
    )
    job_4 = Job(
        title='Job Title 4',
        po_number=222222,
        description='Description of job 4',
        status='Done',
        department_id=1
    )

    db.session.add(job_1)
    db.session.add(job_2)
    db.session.add(job_3)
    db.session.add(job_4)

    db.session.commit()

def undo_jobs():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.jobs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM jobs"))

    db.session.commit()
