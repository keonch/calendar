import React from 'react';
import EventIndex from './event_index';
import CalendarDayItem from './calendar_day_item';

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
      let eventsArray = this.props.sortedEvents[this.state.yearMonth] ?
        this.props.sortedEvents[this.state.yearMonth][day] : null;
      if (!eventsArray) eventsArray = [];

      days.push(
        <CalendarDayItem
          key={i + numberOfBlanks}
          day={day}
          toggleIndex={this.toggleIndex}
          eventsArray={eventsArray}/>
      );
    }
    return days;
  }

  render() {
    return (
      <div className="app">
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

        <section className="calendar">
          {this.renderWeekdays()}
          {this.renderDays()}
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
