from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Note(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('jobs.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship('User', backref='notes')
    job = db.relationship('Job', backref='notes')

    def __str__(self):
        return self.title
