import React from 'react';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      description: "",
      start: 0,
      end: 96
    }

    this.updateField = this.updateField.bind(this);
  }

  updateField(e) {
    this.setState({ [e.currentTarget.className]: e.currentTarget.value });
  }

  render() {
    return (
      <form>
        <label>Description</label>
        <input
          className="description"
          type="text"
          value={this.state.description}
          onChange={this.updateField}/>

        <label>Start Time</label>
        {this.state.start}
        <input
          className="start"
          type="range"
          min="0" max="96"
          value={this.state.start}
          onChange={this.updateField}
          step="1"/>


        <label>End Time</label>
        {this.state.end}
        <input
          className="end"
          type="range"
          min="0" max="96"
          value={this.state.end}
          onChange={this.updateField}
          step="1"/>

        <input type="submit"/>
        <div onClick={() => this.props.toggleForm()}>Cancel</div>
      </form>
    );
  }
}
