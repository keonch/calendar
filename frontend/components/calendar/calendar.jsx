import React from 'react';
import EventIndex from '../event_index/event_index_container';
import CalendarDayItem from './calendar_day_item';
import { CSSTransitionGroup } from 'react-transition-group'

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.currentDate = new Date();

    this.state = {
      month: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear(),
      yearMonth: this.currentDate.getFullYear().toString().concat(this.currentDate.getMonth()),
      showIndex: false,
      indexDate: this.currentDate
    }

    this.toggleIndex = this.toggleIndex.bind(this);
    this.closeIndex = this.closeIndex.bind(this);
    this.renderDays = this.renderDays.bind(this);
    this.getEventsArray = this.getEventsArray.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllEvents();
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
      yearMonth: year.toString().concat(month),
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

  getEventsArray(day) {
    let eventsArray = this.props.sortedEvents[this.state.yearMonth] ?
      this.props.sortedEvents[this.state.yearMonth][day] : null;
    if (!eventsArray) eventsArray = [];
    return eventsArray;
  }

  renderDays() {
    const days = [];

    // create blank days before the first day of the month
    const firstWeekday = new Date(this.state.year, this.state.month, 1).getDay();
    for (let i = 0; i < firstWeekday; i++) {
      days.push(<div className="blank" key={i}></div>)
    };
    const numberOfBlanks = days.length;

    const daysInMonth = new Date(this.state.year, this.state.month + 1, 0).getDate();
    for (let i = 0; i < daysInMonth; i++) {
      const day = i + 1;
      days.push(
        <CalendarDayItem
          key={i + numberOfBlanks}
          day={day}
          toggleIndex={this.toggleIndex}
          getEventsArray={this.getEventsArray}/>
      );
    }

    // wraps days onto prev week when past 35 blocks on the calendar
    for (let i = days.length; i > 35; i--) {
      const idx = 27 + i - 35;
      const topDay = days[idx];
      const bottomDay = days.pop();
      days[idx] = (
        <div className="day-stacked" key={idx}>
          {topDay}
          {bottomDay}
        </div>
      );
    }

    for (let i = days.length; i < 35; i++) {
      days.push(<div className="blank" key={i}></div>)
    }

    return days;
  }

  render() {
    return (
      <div className="app">
        <section className="calendar">
          <header>
            <i
              className={`fas fa-angle-left`}
              onClick={() => this.changeMonth(-1)}/>
            <h1>{this.months[this.state.month]}</h1>
            <i
              className={`fas fa-angle-right`}
              onClick={() => this.changeMonth(1)}/>
            <h1>{this.state.year}</h1>
          </header>

          <div className="days">
            {this.renderWeekdays()}
            {this.renderDays()}
          </div>
        </section>

        <CSSTransitionGroup
          transitionName="index"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {
            this.state.showIndex &&
            <EventIndex
              months={this.months}
              weekdays={this.weekdays}
              closeIndex={this.closeIndex}
              getEventsArray={this.getEventsArray}
              date={this.state.indexDate}/>
          }
        </CSSTransitionGroup>
      </div>
    )
  }
}
