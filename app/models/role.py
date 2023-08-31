from .db import db, environment, SCHEMA, add_prefix_for_prod

class Role(db.Model):
    __tablename__ = 'roles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    def __str__(self):
        return self.name
