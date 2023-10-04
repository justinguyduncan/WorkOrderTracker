from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Department(db.Model):
    __tablename__ = 'departments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    user_departments = db.relationship('UserDepartment', back_populates='department')

    def to_dict(self):
        return {'id': self.id, 'name': self.name}
