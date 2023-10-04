from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import UserDepartment

user_department_routes = Blueprint('user_departments', __name__)


@user_department_routes.route('/<int:user_id>')
@login_required  
def get_user_departments(user_id):
    """
    Query for user departments based on user_id and return them as a list of dictionaries
    """
    user_departments = UserDepartment.query.filter_by(user_id=user_id).all()
    return jsonify({'user_departments': [user_department.to_dict() for user_department in user_departments]})
