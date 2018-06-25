import React from 'react';
import EventForm from './event_form_container';

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

  render() {
    return (
      <div className="index">
        <div onClick={() => this.props.closeIndex()}>Close</div>
        <h1>
          {`${this.props.weekdays[this.state.date.getDay()]}, ${this.props.months[this.state.date.getMonth()]} ${this.state.date.getDate()}`}
        </h1>
        {
          this.state.showForm ?
          <EventForm closeForm={this.toggleForm} date={this.state.date}/> :
          <div onClick={() => this.toggleForm()}>Create An Event</div>
        }
      </div>
    );
  }
}
