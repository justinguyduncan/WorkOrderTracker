from flask import Blueprint, jsonify, request
from app.models import User, Role
from app.models.db import db
from flask_login import login_required

user_roles_routes = Blueprint('user_roles', __name__)

# Update user's roles and permissions
@user_roles_routes.route('/<int:id>/roles', methods=['PUT'])
@login_required
def update_user_roles(id):
    # Get the user by ID
    user = User.query.get(id)

    # Ensure the user exists
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Get the JSON data from the request body
    data = request.json

    # Get the roles from the data
    roles = data.get('roles', [])

    # Get the existing roles for the user
    existing_roles = user.roles

    # Clear the existing roles
    user.roles.clear()

    # Add the selected roles to the user
    for role_id in roles:
        role = Role.query.get(role_id)
        if role:
            user.roles.append(role)

    # Commit the changes to the database
    db.session.commit()

    return jsonify({'message': 'User roles updated successfully'})
