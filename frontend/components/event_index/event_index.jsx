import React from 'react';
import EventForm from '../event_form/event_create_form_container';
import EventIndexItem from './event_index_item_container';

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
    const events = this.props.eventsArray.length > 0 ?
      this.props.eventsArray.map((eventId) => {
        return (
          <EventIndexItem
            key={eventId}
            date={this.state.date}
            event={this.props.events[eventId]}/>
        );
      })
      :
      <div className="empty">Empty :(</div>;

    return events;
  }

  render() {
    return (
      <div className="index">
        <div
          className="close-index"
          onClick={() => this.props.closeIndex()}>
          <div className="fas fa-angle-double-right"/>
        </div>

        <div className="index-content">
          <h3 className="date">
            {
              `${this.props.weekdays[this.state.date.getDay()]}, ` +
              `${this.props.months[this.state.date.getMonth()]} ` +
              `${this.state.date.getDate()}`
            }
          </h3>

          {
            this.state.showForm ?
            <EventForm
              closeForm={this.toggleForm}
              date={this.state.date}/>
            :
            <div
              className="create-event-btn"
              onClick={() => this.toggleForm()}>
              Create An Event
            </div>
          }

          <div className="event-index">
            {this.renderEvents()}
          </div>
        </div>
      </div>
    );
  }
}
