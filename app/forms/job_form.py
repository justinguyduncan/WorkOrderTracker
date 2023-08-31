from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired

class JobForm(FlaskForm):
    title = StringField('Job Title', validators=[DataRequired()])
    po_number = IntegerField('PO Number', validators=[DataRequired()])
    description = TextAreaField('Job Description', validators=[DataRequired()])
    submit = SubmitField('Create Job')
