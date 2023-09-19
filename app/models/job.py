from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Job(db.Model):
    __tablename__ = 'jobs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    po_number = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(255), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('departments.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    department = db.relationship('Department', backref='jobs')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'po_number': self.po_number,
            'description': self.description,
            'status': self.status,
            'department_id': self.department_id,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
        }
