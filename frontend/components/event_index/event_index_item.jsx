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
            <div>
              {this.props.event.description}
              {startTime}
              {endTime}
              <div onClick={() => this.handleDelete()}>Delete</div>
              <div onClick={() => this.toggleForm()}>Edit</div>
            </div>
        }
      </div>
    );
  }
}
