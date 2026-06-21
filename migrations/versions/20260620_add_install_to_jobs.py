"""add install to jobs

Revision ID: add_install_to_jobs
Revises: add_due_date_to_jobs
Create Date: 2026-06-20

"""
from alembic import op
import sqlalchemy as sa

revision = 'b1c2d3e4f5a6'
down_revision = 'a79b814c69fa'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('jobs', sa.Column('install', sa.Boolean(), nullable=False, server_default='0'))


def downgrade():
    op.drop_column('jobs', 'install')
