import React from 'react';
import { formatTime, parseValueToTime } from '../../utils/time_util';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.description,
      start: props.start,
      end: props.end,
      startTime: props.startTime,
      endTime: props.endTime
    }

    this.updateDescription = this.updateDescription.bind(this);
    this.updateStartTime = this.updateStartTime.bind(this);
    this.updateEndTime = this.updateEndTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateDescription(e) {
    this.setState({ description: e.currentTarget.value });
  }

  updateStartTime(e) {
    const start = e.target.value;
    const startTime = parseValueToTime(start, this.props.date);
    if (start > this.state.end) {
      this.setState({
        start,
        end: start,
        startTime,
        endTime: startTime
      })
    } else {
      this.setState({
        start,
        startTime
      })
    }
  }

  updateEndTime(e) {
    const end = e.target.value;
    const endTime = parseValueToTime(end, this.props.date);
    if (this.state.start > end) {
      this.setState({
        start: end,
        end,
        startTime: endTime,
        endTime
      })
    } else {
      this.setState({
        end,
        endTime
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = Object.assign({}, {
      event: {
        description: this.state.description,
        startTime: this.state.startTime,
        endTime: this.state.endTime
      }
    });
    if (this.props.type === "create") {
      this.props.submitEvent(data);
    } else if (this.props.type === "edit") {
      data.event.id = this.props.eventId;
      this.props.editEvent(data);
    }
    this.props.closeForm();
  }

  render() {
    return (
      <form className="event-form" onSubmit={this.handleSubmit}>
        <div
          className="event-form-cancel"
          onClick={this.props.closeForm}>
          Cancel
        </div>

        {
          this.props.type === "edit" &&
          <div
            className="delete-event"
            onClick={() => this.props.deleteEvent(this.props.eventId)}>
            Delete
          </div>
        }

        <label className="description-label">Description</label>
        <textarea
          className="form-description"
          value={this.state.description}
          placeholder="Enter event description"
          onChange={this.updateDescription}/>

        <label className="label-start">
          Start Time {formatTime(this.state.startTime)}
        </label>
        <input
          className="slider form-start"
          type="range"
          min="10"
          max="24.4"
          step="0.1"
          value={this.state.start}
          onChange={this.updateStartTime}/>

        <label className="label-end">
          End Time {formatTime(this.state.endTime)}
        </label>
        <input
          className="slider form-end"
          type="range"
          min="10"
          max="24.4"
          step="0.1"
          value={this.state.end}
          onChange={this.updateEndTime}/>

        <input className="event-submit" type="submit"/>
      </form>
    );
  }
}
