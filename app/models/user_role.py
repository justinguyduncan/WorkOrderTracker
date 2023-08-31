from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class UserRole(db.Model):
    __tablename__ = 'user_roles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('roles.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref='user_roles')
    role = db.relationship('Role', backref='user_roles')

    def __str__(self):
        return f"{self.user} - {self.role}"
