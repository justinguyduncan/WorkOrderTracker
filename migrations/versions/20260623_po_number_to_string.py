"""change po_number to string for alphanumeric job numbers

Revision ID: c2d3e4f5a6b7
Revises: b1c2d3e4f5a6
Create Date: 2026-06-23

"""
from alembic import op
import sqlalchemy as sa


revision = 'c2d3e4f5a6b7'
down_revision = 'b1c2d3e4f5a6'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('jobs') as batch_op:
        batch_op.alter_column(
            'po_number',
            existing_type=sa.Integer(),
            type_=sa.String(length=255),
            existing_nullable=False,
            postgresql_using='po_number::varchar',
        )


def downgrade():
    with op.batch_alter_table('jobs') as batch_op:
        batch_op.alter_column(
            'po_number',
            existing_type=sa.String(length=255),
            type_=sa.Integer(),
            existing_nullable=False,
            postgresql_using='po_number::integer',
        )
