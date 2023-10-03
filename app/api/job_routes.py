from flask import Blueprint, jsonify, request
from app.models import Job, Department
from app.models.db import db
from app.forms import JobForm
from flask_login import login_required

job_routes = Blueprint('jobs', __name__)

# Create a new job
@job_routes.route('/', methods=['POST'])
# @login_required
def create_job():
    form = JobForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        title = form.title.data
        po_number = form.po_number.data
        description = form.description.data
        status = form.status.data
        department_id = form.department_id.data

        job = Job(
            title=title,
            po_number=po_number,
            description=description,
            status=status,
            department_id=department_id,
        )
        db.session.add(job)
        db.session.commit()

        return jsonify({'message': 'Job created successfully'})

    return jsonify({'errors': form.errors}), 400

# Retrieve a list of all jobs
@job_routes.route('/', methods=['GET'])
@login_required
def get_jobs():
    jobs = Job.query.all()
    return jsonify({'jobs': [job.to_dict() for job in jobs]})

# Retrieve details of a specific job
@job_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_job(id):
    job = Job.query.get(id)
    if job:
        return jsonify(job.to_dict())
    return jsonify({'message': 'Job not found'}), 404

# Update a job's details
@job_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_job(id):

    job = Job.query.get(id)

    if not job:
        return jsonify({'message': 'Job not found'}), 404

    form = JobForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        job.title = form.title.data
        job.po_number = form.po_number.data
        job.description = form.description.data
        job.status = form.status.data
        job.department_id = form.department_id.data

        db.session.commit()

        return jsonify({'message': 'Job updated successfully'})

    return jsonify({'errors': form.errors}), 400

# Delete a job
@job_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_job(id):
    job = Job.query.get(id)

    if not job:
        return jsonify({'message': 'Job not found'}), 404

    db.session.delete(job)
    db.session.commit()

    return jsonify({'message': 'Job deleted successfully'})


# Retrieve jobs specific to a department
@job_routes.route('/departments/<int:id>', methods=['GET'])
@login_required
def get_department_jobs(id):
    department = Department.query.get(id)

    if not department:
        return jsonify({'message': 'Department not found'}), 404

    jobs = department.jobs
    return jsonify({'jobs': [job.to_dict() for job in jobs]})

# # Update a job's status
# @job_routes.route('/<int:id>/status', methods=['PUT'])
# @login_required
# def update_job_status(id):
#     job = Job.query.get(id)

#     if not job:
#         return jsonify({'message': 'Job not found'}), 404

#     new_status = request.json.get('status')

#     if new_status is None:
#         return jsonify({'message': 'Missing "status" field in request'}), 400

#     job.status = new_status
#     db.session.commit()

#     return jsonify({'message': 'Job status updated successfully'})
