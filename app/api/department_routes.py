from flask import Blueprint, jsonify, request
from app.models import Department
from app.models.db import db
from app.forms import DepartmentForm
from flask_login import login_required

department_routes = Blueprint('departments', __name__)

# Create a new department
@department_routes.route('/', methods=['POST'])
@login_required
def create_department():
    form = DepartmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        name = form.name.data

        # Create a new department
        department = Department(name=name)

        # Add the department to the database
        db.session.add(department)
        db.session.commit()

        return jsonify({'message': 'Department created successfully'})

    return jsonify({'errors': form.errors}), 400

# Retrieve a list of departments
@department_routes.route('/', methods=['GET'])
@login_required
def get_departments():
    # Get all departments
    departments = Department.query.all()

    # Convert departments to a list of dictionaries
    departments_data = [department.to_dict() for department in departments]

    return jsonify({'departments': departments_data})

# Retrieve details of a specific department
@department_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_department(id):
    # Get the department by ID
    department = Department.query.get(id)

    # Ensure the department exists
    if not department:
        return jsonify({'error': 'Department not found'}), 404

    return jsonify({'department': department.to_dict()})

# Update a department's details
@department_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_department(id):
    # Get the department by ID
    department = Department.query.get(id)

    # Ensure the department exists
    if not department:
        return jsonify({'error': 'Department not found'}), 404

    # Get the JSON data from the request body
    data = request.json

    # Update the department's name
    department.name = data.get('name')

    # Commit the changes to the database
    db.session.commit()

    return jsonify({'message': 'Department updated successfully'})

# Delete a department
@department_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_department(id):
    # Get the department by ID
    department = Department.query.get(id)

    # Ensure the department exists
    if not department:
        return jsonify({'error': 'Department not found'}), 404

    # Delete the department from the database
    db.session.delete(department)
    db.session.commit()

    return jsonify({'message': 'Department deleted successfully'})
