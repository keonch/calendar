# Calendar
[Live](https://calendar-kc.herokuapp.com/)  

### Technologies
* Ruby on Rails
* PostgreSQL
* React.js
* Redux

### Setup
1. `bundle install`
2. `rails server`
3. `npm install`

## Specs
* Have one month view
* Have one hardcoded user
* Click on a day box, and be able to create a new event on that day which gets sent to the backend on clicking submit.
   * The form should have start time, end time, description and submit.
   * Once submit is clicked the form should disappear.
   * Event should now appear in that day’s box.
   * Events cannot span multiple days. Must start and end the same day.
* Show all events the user has on their calendar.
* The UI should have 4 rows of 7 boxes (simple case of a 28 day month).
* The application should communicate with an API backend using JSON.
* Switch between months
* Day view
* Handle too many events to fit in your box UI on a given day
* Update/delete events
* The UI should have 5 rows of 7 boxes with the correct date on the correct days

#### Future Specs
* Handle events spanning multiple days
* Week view

## API Endpoints
Implemented with RESTful APIs on Rails backend
* GET /events
  * Fetch all events
* POST /events
  * Create events
* DELETE /events/:id
  * Delete an event
* PUT /events/:id
  * Update an event

## UI/UX
Clicking on a day opens an index of events including a form to create an event   
![ui1](https://media.giphy.com/media/9u1mRfpOUjie2zEjOB/giphy.gif)  

Groups events to fit in day boxes  
![ui2](https://media.giphy.com/media/EriSvEe5QJYuLSCOR7/giphy.gif)
