from app.models import db, UserDepartment, environment, SCHEMA
from sqlalchemy import text

def seed_user_departments():

    demo_department = UserDepartment(user_id=1, department_id=1)
    justin_department = UserDepartment(user_id=2, department_id=1)
    brian_department = UserDepartment(user_id=3, department_id=1)
    shane_department = UserDepartment(user_id=4, department_id=1)
    mike_department = UserDepartment(user_id=5, department_id=1)
    ralph_department = UserDepartment(user_id=6, department_id=2)
    luis_department = UserDepartment(user_id=7, department_id=4)
    josh_department = UserDepartment(user_id=8, department_id=3)


    db.session.add(demo_department)
    db.session.add(justin_department)
    db.session.add(brian_department)
    db.session.add(shane_department)
    db.session.add(mike_department)
    db.session.add(ralph_department)
    db.session.add(luis_department)
    db.session.add(josh_department)

    db.session.commit()

def undo_user_departments():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.user_departments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_departments"))

    db.session.commit()
