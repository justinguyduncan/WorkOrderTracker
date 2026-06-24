from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField, DateField
from wtforms.validators import DataRequired, Optional

class JobForm(FlaskForm):
    title = StringField('Client Name', validators=[DataRequired()])
    po_number = StringField('Job Number', validators=[DataRequired()])
    description = TextAreaField('Job Description', validators=[DataRequired()])
    status = StringField('Status', validators=[DataRequired()])
    due_date = DateField('Due Date', validators=[Optional()])
    department_id = IntegerField('Department ID', validators=[DataRequired()])
    submit = SubmitField('Create Job')