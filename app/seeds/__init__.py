from flask.cli import AppGroup
from .users import seed_users, undo_users
from .roles import seed_roles, undo_roles
from .user_roles import seed_user_roles, undo_user_roles
from .departments import seed_departments, undo_departments
from .user_departments import seed_user_departments, undo_user_departments
from .jobs import seed_jobs, undo_jobs
from .notes import seed_notes, undo_notes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_notes()
        undo_jobs()
        undo_user_departments()
        undo_departments()
        undo_user_roles()
        undo_roles()
        undo_users()
        # Add other undo functions here
    seed_users()
    seed_roles()
    seed_user_roles()
    seed_departments()
    seed_user_departments()
    seed_jobs()
    seed_notes()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_roles()
    undo_user_roles()
    undo_departments()
    undo_user_departments()
    undo_jobs()
    undo_notes()
    # Add other undo functions here
