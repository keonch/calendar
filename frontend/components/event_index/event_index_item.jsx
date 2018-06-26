import React from 'react';
import { formatTime } from '../../utils/time_util';
import EventForm from '../event_form/event_edit_form_container';

export default class EventIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  handleDelete() {
    const eventId = this.props.event.id;
    this.props.deleteEvent(eventId);
  }

  toggleForm() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    const startTime = formatTime(this.props.event.startTime);
    const endTime = formatTime(this.props.event.endTime);
    return (
      <div className="event-item">
        {
          this.state.showForm ?
            <EventForm
              event={this.props.event}
              deleteEvent={this.props.deleteEvent}
              date={this.props.date}
              closeForm={this.toggleForm}/>
          :
            <div className="event-item-show">
              <div className="event-item-description">
                {this.props.event.description}
              </div>
              <div className="event-item-start event-item-time">
                {startTime} - {endTime}
              </div>
              <div
                className="delete-event"
                onClick={() => this.handleDelete()}>
                Delete
              </div>
              <div
                className="edit-event"
                onClick={() => this.toggleForm()}>
                Edit
              </div>
            </div>
        }
      </div>
    );
  }
}
