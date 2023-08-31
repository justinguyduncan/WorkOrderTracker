from flask import Blueprint, jsonify, request
from app.models import Note, Job
from app.models.db import db
from app.forms import NoteForm
from flask_login import login_required

note_routes = Blueprint('notes', __name__)

# Create a new note for a job
@note_routes.route('/jobs/<int:id>/notes', methods=['POST'])
@login_required
def create_note(id):
    form = NoteForm()

    if form.validate_on_submit():
        # Get the job by ID
        job = Job.query.get(id)

        if not job:
            return jsonify({'error': 'Job not found'}), 404

        content = form.content.data

        # Create a new note
        note = Note(content=content, user_id=current_user.id, job_id=job.id)

        # Add the note to the database
        db.session.add(note)
        db.session.commit()

        return jsonify({'message': 'Note created successfully'})

    return jsonify({'errors': form.errors}), 400


# Retrieve all notes for a job
@note_routes.route('/jobs/<int:id>/notes', methods=['GET'])
@login_required
def get_notes_for_job(id):
    # Get the job by ID
    job = Job.query.get(id)

    # Ensure the job exists
    if not job:
        return jsonify({'error': 'Job not found'}), 404

    # Get all notes for the job
    notes = job.notes

    # Convert notes to a list of dictionaries
    notes_data = [note.to_dict() for note in notes]

    return jsonify({'notes': notes_data})

# Retrieve details of a specific note
@note_routes.route('/notes/<int:id>', methods=['GET'])
@login_required
def get_note(id):
    # Get the note by ID
    note = Note.query.get(id)

    # Ensure the note exists
    if not note:
        return jsonify({'error': 'Note not found'}), 404

    return jsonify({'note': note.to_dict()})

# Delete a note
@note_routes.route('/notes/<int:id>', methods=['DELETE'])
@login_required
def delete_note(id):
    # Get the note by ID
    note = Note.query.get(id)

    # Ensure the note exists
    if not note:
        return jsonify({'error': 'Note not found'}), 404

    # Delete the note from the database
    db.session.delete(note)
    db.session.commit()

    return jsonify({'message': 'Note deleted successfully'})
