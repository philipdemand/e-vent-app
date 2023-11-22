<h2>E-Vent</h2>

E-Vent is an event planning app.  Users can submit an event, and manage their attendance at events.

Models in use for this app are:
  User -< Attendance >- Event

E-Vent uses BCrypt to authenticate users.  

A logged-in user can:
  Persist their logged-in state through a page refresh
  Create an event with details
    (CRUD actions on Attendance using RESTful routes)
    Register for an existing event, along with the total number of attendees they plan to bring
    Have their registration displayed to all users
    Update their number of attendees
    Cancel their registration
    Display all of the events for which they are registered
  Log out of the app

Users cannot update or destroy the attendances of other users.

Validation and controller errors are passed to the frontend and displayed to users.






