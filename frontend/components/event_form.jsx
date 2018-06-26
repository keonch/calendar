import React from 'react';
import { formatTime } from '../utils/time_format_util';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    const year = props.date.getFullYear(),
          month = props.date.getMonth(),
          date = props.date.getDate()

    this.state = {
      description: "",
      start: 10.0,
      end: 24.4,
      startTime: props.date,
      endTime: new Date(year, month, date, 23, 59, 59, 999)
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
    const startTime = this.parseValueToTime(start);
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
    const endTime = this.parseValueToTime(end);
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

  // parses from input values from sliders to date objects
  parseValueToTime(value) {
    const totalMinutes = Math.round((value - 10) * 100),
          year = this.props.date.getFullYear(),
          month = this.props.date.getMonth(),
          date = this.props.date.getDate(),
          time = new Date(year, month, date)

    let hours = Math.floor(totalMinutes / 60),
        minutes = totalMinutes % 60

    if (hours === 24) {
      time.setHours(23, 59, 59, 999);
    } else {
      time.setHours(hours, minutes, 0, 0);
    }
    return time;
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
    this.props.submitEvent(data);
    this.props.closeForm();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div onClick={() => this.props.closeForm()}>Cancel</div>

        <label>Description</label>
        <input
          className="description"
          type="text"
          value={this.state.description}
          placeholder="Enter event description"
          onChange={this.updateDescription}/>

        <label>Start Time</label>
        {formatTime(this.state.startTime)}
        <input
          className="start"
          type="range"
          min="10"
          max="24.4"
          step="0.1"
          value={this.state.start}
          onChange={this.updateStartTime}/>

        <label>End Time</label>
        {formatTime(this.state.endTime)}
        <input
          className="end"
          type="range"
          min="10"
          max="24.4"
          step="0.1"
          value={this.state.end}
          onChange={this.updateEndTime}/>

        <input type="submit"/>
      </form>
    );
  }
}
