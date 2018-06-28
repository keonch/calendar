import React from 'react';
import EventIndex from '../event_index/event_index_container';
import CalendarDayItem from './calendar_day_item';
import { CSSTransitionGroup } from 'react-transition-group';
import { MONTHS, WEEKDAYS } from '../../utils/constants';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.currentDate = new Date();
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    this.state = {
      month,
      year,
      yearMonth: `${year}${month}`,
      showIndex: false,
      indexDate: this.currentDate
    }

    this.handleEventIndex = this.handleEventIndex.bind(this);
    this.closeIndex = this.closeIndex.bind(this);
    this.renderDayItems = this.renderDayItems.bind(this);
    this.getEventsArray = this.getEventsArray.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllEvents();
  }

  toggleMonth(increment) {
    let month = this.state.month + increment;
    let year = this.state.year;
    if (month < 0) {
      month = 11;
      year--;
    } else if (month > 11) {
      month = 0;
      year++;
    }
    this.setState({
      month,
      year,
      yearMonth: year.toString().concat(month),
      showIndex: false
    })
  }

  handleEventIndex(day) {
    const indexDate = new Date(this.state.year, this.state.month, day);
    // If user selects the same day when index is open, close the index
    if (this.state.showIndex) {
      day !== this.state.indexDate.getDate() ?
      this.setState({indexDate}) : this.closeIndex();
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

  getEventsArray(day) {
    let eventsArray = this.props.sortedEvents[this.state.yearMonth] ?
      this.props.sortedEvents[this.state.yearMonth][day] || [] : [];
    return eventsArray;
  }

  renderDayItems() {
    const dayItems = [];

    // Creates "blank" days before the first day of the month
    const firstWeekday = new Date(
      this.state.year,
      this.state.month,
      1
    ).getDay();
    for (let i = 0; i < firstWeekday; i++) {
      dayItems.push(<div className="blank" key={i}></div>)
    };
    const numberOfBlanks = dayItems.length;

    // Creates DayItem components for each day of the month
    const daysInMonth = new Date(
      this.state.year,
      this.state.month + 1,
      0
    ).getDate();
    for (let i = 0; i < daysInMonth; i++) {
      const day = i + 1;
      dayItems.push(
        <CalendarDayItem
          key={i + numberOfBlanks}
          day={day}
          handleEventIndex={this.handleEventIndex}
          eventsArray={this.getEventsArray(day)}/>
      );
    }

    // This iteration stacks DayItem components that passes 35 slots
    // (5rows x 7columns)
    // Overflowing DayItems are stacked with DayItems from 5th row
    // (starting index of 28)
    for (let i = dayItems.length; i > 35; i--) {
      const idx = 27 + i - 35;
      // adds a new prop of "stacked" to DayItems
      const topDay = React.cloneElement(
        dayItems[idx],
        {stacked: true}
      );
      const bottomDay = React.cloneElement(
        dayItems.pop(),
        {stacked: true}
      );
      dayItems[idx] = (
        <div className="day-stacked" key={idx}>
          {topDay}
          {bottomDay}
        </div>
      );
    }

    // Fills rest of the slots with blank days if missing DayItems
    for (let i = dayItems.length; i < 35; i++) {
      dayItems.push(<div className="blank" key={i}></div>)
    }

    return dayItems;
  }

  render() {
    const weekdays = WEEKDAYS.map((weekday) => (
      <div key={weekday} className="weekday">{weekday}</div>
    ));

    return (
      <div className="app">
        <section className="calendar">
          <header>
            <i
              className={`fas fa-angle-left`}
              onClick={() => this.toggleMonth(-1)}/>
            <h1>{MONTHS[this.state.month]}</h1>
            <i
              className={`fas fa-angle-right`}
              onClick={() => this.toggleMonth(1)}/>
            <h1>{this.state.year}</h1>
          </header>

          <div className="days">
            {weekdays}
            {this.renderDayItems()}
          </div>
        </section>

        <CSSTransitionGroup
          transitionName="index"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
        {
          this.state.showIndex &&
          <EventIndex
            closeIndex={this.closeIndex}
            getEventsArray={this.getEventsArray}
            date={this.state.indexDate}/>
        }
        </CSSTransitionGroup>
      </div>
    );
  }
}
