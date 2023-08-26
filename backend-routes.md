## Authentication and User Management Routes

### Create a new user account.
- `POST /signup`

### Authenticate and log in a user.
- `POST /login`

### Allow users to log in as a demo user.
- `POST /demo-login`

### Log out the currently logged-in user.
- `POST /logout`

### Retrieve user's profile information.
- `GET /profile`

### Update user's profile information.
- `PUT /profile`

## Department Management Routes

### Create a new department.
- `POST /departments`

### Retrieve a list of departments.
- `GET /departments`

### Retrieve details of a specific department.
- `GET /departments/:id`

### Update a department's details.
- `PUT /departments/:id`

### Delete a department.
- `DELETE /departments/:id`

## Job Management Routes

### Create a new job.
- `POST /jobs`

### Retrieve a list of all jobs.
- `GET /jobs`

### Retrieve details of a specific job.
- `GET /jobs/:id`

### Update a job's details.
- `PUT /jobs/:id`

### Delete a job.
- `DELETE /jobs/:id`

### Retrieve jobs specific to a department.
- `GET /departments/:id/jobs`

### Update a job's status.
- `PUT /jobs/:id/status`

## Note Management Routes

### Create a new note for a job.
- `POST /jobs/:id/notes`

### Retrieve all notes for a job.
- `GET /jobs/:id/notes`

### Retrieve details of a specific note.
- `GET /notes/:id`

### Delete a note.
- `DELETE /notes/:id`

## User Roles and Permissions Routes

### Update user's roles and permissions.
- `PUT /users/:id/roles`

## Search Routes

### Search for jobs based on keywords.
- `GET /jobs/search`
