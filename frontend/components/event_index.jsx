import React from 'react';
import EventForm from './event_form_container';
import { formatTime } from '../utils/time_format_util';

export default class EventIndexForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      showForm: false,
      description: "",
      start: null,
      end: null
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return ({
      date: props.date
    });
  }

  componentDidUpdate(prevProps) {
    if (this.state.date !== prevProps.date) {
      this.setState({
        showForm: false
      })
    }
  }

  toggleForm() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  renderEvents() {
    return this.props.eventsArray.map((eventId) => {
      const event = this.props.events[eventId],
            startTime = formatTime(event.startTime),
            endTime = formatTime(event.endTime);
      return (
        <div
          key={eventId}
          className="index-event">
          <div>{event.description}</div>
          <div>Starting: {startTime}</div>
          <div>Ending: {endTime}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="index">
        <div onClick={() => this.props.closeIndex()}>Close</div>
        <h3 className="date">
          {
            `${this.props.weekdays[this.state.date.getDay()]}, ` +
            `${this.props.months[this.state.date.getMonth()]} ` +
            `${this.state.date.getDate()}`
          }
        </h3>
        {
          this.state.showForm ?
          <EventForm closeForm={this.toggleForm} date={this.state.date}/> :
          <div onClick={() => this.toggleForm()}>Create An Event</div>
        }
        <div className="index-events">
          {this.renderEvents()}
        </div>
      </div>
    );
  }
}
