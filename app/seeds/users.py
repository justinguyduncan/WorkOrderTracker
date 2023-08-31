from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io',
        first_name='Demo',
        last_name='User',
        password='password'
    )
    justin = User(
        email='justin@aa.io',
        first_name='Justin',
        last_name='Duncan',
        password='password'
    )
    brian = User(
        email='brian@aa.io',
        first_name='Brian',
        last_name='Davis',
        password='password'
    )
    shane = User(
        email='shane@aa.io',
        first_name='Shane',
        last_name='Duncan',
        password='password'
    )
    mike = User(
        email='mike@aa.io',
        first_name='Mike',
        last_name='Foster',
        password='password'
    )
    ralph = User(
        email='ralph@aa.io',
        first_name='Ralph',
        last_name='Johnson',
        password='password'
    )
    luis = User(
        email='luis@aa.io',
        first_name='Luis',
        last_name='Smith',
        password='password'
    )
    josh = User(
        email='josh@aa.io',
        first_name='Josh',
        last_name='Rutledge',
        password='password'
    )


    db.session.add(demo)
    db.session.add(justin)
    db.session.add(brian)
    db.session.add(shane)
    db.session.add(mike)
    db.session.add(ralph)
    db.session.add(luis)
    db.session.add(josh)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
