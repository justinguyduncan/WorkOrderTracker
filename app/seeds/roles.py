from app.models import db, Role, environment, SCHEMA
from sqlalchemy.sql import text


def seed_roles():
    admin_role = Role(name='admin')
    employee = Role(name='employee')

    db.session.add(admin_role)
    db.session.add(employee)
    db.session.commit()


def undo_roles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.roles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM roles"))

    db.session.commit()
