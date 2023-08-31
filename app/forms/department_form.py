from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class DepartmentForm(FlaskForm):
    name = StringField('Department Name', validators=[DataRequired()])
    submit = SubmitField('Create Department')
