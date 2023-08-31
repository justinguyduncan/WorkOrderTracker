from app.models import db, environment, SCHEMA
from app.models.user import User
from app.models.role import Role
from app.models.user_role import UserRole  # Import the UserRole model
from sqlalchemy import text  # Import the 'text' function

def seed_user_roles():
    employee_role_id = 2
    admin_role_id = 1

    demo_role = UserRole(user_id=1, role_id=admin_role_id)
    justin_role = UserRole(user_id=2, role_id=admin_role_id)
    brian_role = UserRole(user_id=3, role_id=admin_role_id)
    shane_role = UserRole(user_id=4, role_id=admin_role_id)
    mike_role = UserRole(user_id=5, role_id=employee_role_id)
    ralph_role = UserRole(user_id=6, role_id=employee_role_id)
    luis_role = UserRole(user_id=7, role_id=employee_role_id)
    josh_role = UserRole(user_id=8, role_id=employee_role_id)

    db.session.add(demo_role)
    db.session.add(justin_role)
    db.session.add(brian_role)
    db.session.add(shane_role)
    db.session.add(mike_role)
    db.session.add(ralph_role)
    db.session.add(luis_role)
    db.session.add(josh_role)


    db.session.commit()

def undo_user_roles():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.user_roles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_roles"))

    db.session.commit()
