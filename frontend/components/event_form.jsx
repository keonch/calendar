import React from 'react';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      start: 10.0,
      end: 24.4,
      startTime: props.date,
      endTime: null
    }

    this.updateDescription = this.updateDescription.bind(this);
    this.updateStartTime = this.updateStartTime.bind(this);
    this.updateEndTime = this.updateEndTime.bind(this);
    this.renderFormattedTime = this.renderFormattedTime.bind(this);
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
      time.setHours(23,59,59,999);
    } else {
      time.setHours(hours, minutes, 0, 0);
    }
    return time;
  }

  // reads date object from state and parses to 12 hour AM/PM format
  renderFormattedTime(time) {
    if (time === null) return "End of day";
    let hours = time.getHours();
    let minutes = time.getMinutes();
    if (minutes === 59) return "End of day";
    let period = hours < 12 ? "AM" : "PM";

    if (hours === 0) hours = 12;
    if (hours < 10) hours = "0".concat(`${hours}`);
    if (hours > 12) hours -= 12;
    if (minutes < 10) minutes = "0".concat(`${minutes}`);

    return `${hours}:${minutes} ${period}`
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = Object.assign({}, {
      description: this.state.description,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    });
    this.props.submitEvent(data);
    this.props.closeForm();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Description</label>
        <input
          className="description"
          type="text"
          value={this.state.description}
          placeholder="Enter event description"
          onChange={this.updateDescription}/>

        <label>Start Time</label>
        {this.renderFormattedTime(this.state.startTime)}
        <input
          className="start"
          type="range"
          min="10"
          max="24.4"
          step="0.1"
          value={this.state.start}
          onChange={this.updateStartTime}/>

        <label>End Time</label>
        {this.renderFormattedTime(this.state.endTime)}
        <input
          className="end"
          type="range"
          min="10"
          max="24.4"
          step="0.1"
          value={this.state.end}
          onChange={this.updateEndTime}/>

        <input type="submit"/>
        <div onClick={() => this.props.toggleForm()}>Cancel</div>
      </form>
    );
  }
}
