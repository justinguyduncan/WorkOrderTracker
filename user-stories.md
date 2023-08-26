## Users

### Registration and Authentication

* As a new user, I want to sign up for the website using a registration form.
  * When I'm on the registration page:
    * I should be able to provide my first name, last name, email address, and password in a clear form.
    * Upon successful registration, I should be automatically logged in and directed to the dashboard.
  * If I provide invalid or incomplete information:
    * The website should display relevant validation errors and keep the form populated with my entries.

* As a registered user, I want to log in to the website using my credentials.
  * When I'm on the login page:
    * I should be able to enter my email and password in a user-friendly form.
    * After successfully logging in, I should be redirected to the dashboard.
  * If I enter incorrect credentials:
    * The website should display an error message, and I should be able to retry.

* As a guest user, I want the option to explore the website without signing up or logging in.
  * When I'm on the login page:
    * I should have a "Demo User" button that allows me to log in as an admin user, giving me access to the application's features.

### User Roles and Permissions

* As an admin user, I want to assign different roles and permissions to users.
  * When I'm managing users:
    * I should be able to set roles (regular user or admin user) for each user.
    * Admin users should have access to additional features and functionalities.

### Logout

* As a logged-in user, I want to log out easily.
  * When I'm on any page:
    * I should be able to find a "Log Out" button within the profile dropdown menu.
    * Clicking this button should log me out and redirect me to the About Page.

### Profile Information

* As a user, I want to be able to view and update my profile information.
  * When I'm on my profile page:
    * I should see my current information, including my name and email address.
    * I should have the option to update my email address and password.



## Departments

### Create Department

* As an admin user, I want to create a new department to organize users and jobs efficiently.
  * When I'm logged in as an admin user:
    * I would like to have access to a "Create Department" button on the dashboard.
    * I can click on the button to navigate to a page where I can provide a department name and description.
    * After submitting the form, I expect the new department to be added to the list of available departments.

### Select Department

* As a user, I want to select a preferred department when signing up or updating my profile.
  * When I'm signing up or updating my profile:
    * I would like to see a dropdown list of available departments.
    * I can choose the department that best represents my role or responsibilities within the company.

### Edit Department

* As an admin user, I want to edit a department by adding or removing users.
  * When I'm logged in as an admin user:
    * I can navigate to the department's details page.
    * On the department details page, I have options to add or remove users from the department.
    * I can save my changes, and the department's user list will be updated accordingly.

### Delete Department

* As an admin user, I want to delete a department that is no longer needed.
  * When I'm logged in as an admin user:
    * I can navigate to the department's details page.
    * On the department details page, I can find a "Delete Department" button.
    * After confirming my intention, the department will be removed from the system, and its associated data will be appropriately managed.

## Jobs

### Accessing Jobs

* As a user, I want to access a list of all available jobs.
  * When I'm logged in:
    * I should see a "Jobs" link in the navigation menu.
    * Clicking on the link should take me to a page displaying a list of jobs.
    * Each job should provide essential details like title, status, and assignment.

### Editing and Deleting Jobs

* As a user, I want to be able to edit or delete jobs that I've created.
  * When I'm viewing the details of a job I've created:
    * I should see options to edit or delete the job.
    * Clicking "Edit" should take me to a form where I can modify job details.
    * Clicking "Delete" should prompt me to confirm before removing the job.

### Viewing Jobs by Department

* As a user, I want to filter and view jobs specific to my department.
  * When I'm viewing the list of jobs:
    * I should have an option to filter jobs by department.
    * Selecting a department should update the list to show only jobs assigned to that department.

### Updating Job Status

* As a user, I want to update the status of a job to reflect its progress.
  * When I'm viewing the details of a job:
    * I should see an option to change the job's status (e.g., "In Progress," "Completed," etc.).
    * Selecting a new status should update the job's status and timestamp the change.

### Attaching Files and Images

* As a user, I want to attach files or images to a job for reference.
  * When I'm editing or creating a job:
    * I should have the ability to upload and attach files or images.
    * Attached files should be accessible when viewing the job details.

### Searching for Jobs

* As a user, I want to search for specific jobs using keywords or filters.
  * When I'm on the jobs list page:
    * I should see a search bar where I can enter keywords.
    * Search results should display jobs that match the entered keywords or filters.

### Job History

* As a user, I want to see the history of changes made to a job.
  * When I'm viewing the details of a job:
    * I should have access to a log of changes, including status updates and modifications.
    * The history log should help me understand the job's progression.


## Notes

### Viewing Notes and Job Details

* As a user, I want to view all notes related to a job and access its details.
  * When I'm viewing the details of a job:
    * I should see a section displaying all notes associated with the job.
    * Each note should include the content, author, and timestamp.
    * Clicking on a note should allow me to view its full content and details.

### Deleting Own Notes

* As a user, I want to delete notes that I've added to a job.
  * When I'm viewing the details of a job:
    * I should see a "Delete" option next to notes I've authored.
    * Clicking "Delete" should prompt me to confirm before removing the note.
    * Once confirmed, the note should be permanently deleted.

### Creating Notes

* As a user, I want to create new notes or leave messages about a job.
  * When I'm viewing the details of a job:
    * I should have the option to add a new note to the job.
    * I can enter the content of the note and submit it.
    * The new note should be displayed in the list of notes for the job.
