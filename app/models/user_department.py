from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class UserDepartment(db.Model):
    __tablename__ = 'user_departments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('departments.id')), nullable=False)

    user = db.relationship('User', backref='user_departments')
    department = db.relationship('Department', backref='user_departments')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'department_id': self.department_id,
        }
