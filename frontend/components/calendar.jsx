import React from 'react';
import EventIndex from './event_index';
import { groupAndSortEvents } from '../reducers/selectors';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.currentDate = new Date();

    this.state = {
      month: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear(),
      showIndex: false,
      indexDate: this.currentDate
    }

    this.toggleIndex = this.toggleIndex.bind(this);
    this.closeIndex = this.closeIndex.bind(this);
    this.getDays = this.getDays.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllEvents();
  }

  getDays() {
    const firstDay = new Date(this.state.year, this.state.month, 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div className="empty" key={i}></div>)
    };

    const blankDays = days.length;
    const daysInMonth = new Date(this.state.year, this.state.month + 1, 0).getDate();

    const sortedEvents = groupAndSortEvents(this.props.events, this.state.year, this.state.month);

    for (let i = 0; i < daysInMonth; i++) {
      const day = i + 1;
      const dayEvents = sortedEvents[day];
      const eventDescriptions = dayEvents ?
        dayEvents.map((eventId) => {
          return (
            <div key={eventId}>
              {this.props.events[eventId].description}
            </div>
          )
        }) :
        ""

      days.push(
        <div
          className="day"
          key={i + blankDays}
          onClick={() => this.toggleIndex(day)}>
          <h2>{day}</h2>
          {eventDescriptions}
        </div>
      );
    }
    return days;
  }

  changeMonth(increment) {
    let month;
    let year = this.state.year;
    if (this.state.month + increment < 0) {
      month = 11;
      year--;
    } else if (this.state.month + increment > 11) {
      month = 0;
      year++;
    } else {
      month = this.state.month + increment
    }
    this.setState({
      month,
      year,
      showIndex: false
    })
  }

  toggleIndex(day) {
    const indexDate = new Date(this.state.year, this.state.month, day);
    if (this.state.showIndex) {
      day !== this.state.indexDate.getDate() ?
      this.setState({indexDate})
      :
      this.closeIndex()
    } else {
      this.setState({
        showIndex: true,
        indexDate
      });
    }
  }

  closeIndex() {
    this.setState({
      showIndex: false
    })
  }

  renderWeekdays() {
    return this.weekdays.map((weekday) => (
      <div key={weekday} className="weekday">{weekday}</div>
    ));
  }

  renderRows() {
    const days = this.getDays();
    const rows = [];
    let row = new Array();
    let wrapCount = 0;

    days.forEach((day, i) => {
      if (row.length < 7) {
        row.push(day);
      } else {
        if (rows.length === 4) {
          const prevSlot = row[wrapCount];
          row[wrapCount] = <div key={i}>{prevSlot}{day}</div>
          wrapCount++;
        } else {
          rows.push(row);
          row = new Array();
          row.push(day);
        }
      }

      if (i === days.length - 1) rows.push(row);
    });

    return rows.map((row, i) => (
        <div key={i} className={`row-${i + 1}`}>{row}</div>
    ));
  }

  render() {
    return (
      <div className="app">
        <header>
          <i
            className={`fas fa-caret-left`}
            onClick={() => this.changeMonth(-1)}/>
          {this.months[this.state.month]}
          <i
            className={`fas fa-caret-right`}
            onClick={() => this.changeMonth(1)}/>
          {this.state.year}
        </header>

        <section className="calendar">
          <div className="weekdays">{this.renderWeekdays()}</div>
          {this.renderRows()}
        </section>

        {
          this.state.showIndex &&
          <EventIndex
            months={this.months}
            weekdays={this.weekdays}
            closeIndex={this.closeIndex}
            date={this.state.indexDate}/>
        }
      </div>
    )
  }
}
