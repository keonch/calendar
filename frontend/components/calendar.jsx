import React from 'react';
import EventIndexForm from './event_index_form';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.currentDate = new Date();

    this.state = {
      month: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear(),
      showIndexForm: false,
      indexFormDate: this.currentDate
    }
  }

  componentDidMount() {
    this.props.fetchEvents(this.currentDate);
  }

  getDays() {
    const firstDay = new Date(this.state.year, this.state.month, 1).getDay();
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<td className="empty" key={i}></td>)
    };
    const blankDays = days.length;
    const daysInMonth = new Date(this.state.year, this.state.month + 1, 0).getDate();
    for (let i = 0; i < daysInMonth; i++) {
      const day = i + 1;
      days.push(
        <td
          className="day"
          key={i + blankDays}
          onClick={(e) => this.toggleEventIndexForm(e, day)}>
          {day}
        </td>
      )
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
      year
    })
  }

  toggleEventIndexForm(e, day) {
    const indexFormDate = new Date(this.state.year, this.state.month, day);
    if (this.state.showIndexForm) {
      day !== this.state.indexFormDate.getDate() ?
      this.setState({indexFormDate})
      :
      this.setState({showIndexForm: false})
    } else {
      this.setState({
        showIndexForm: true,
        indexFormDate
      })
    }
  }

  render() {
    const weekdays = this.weekdays.map((weekday) => (
      <td key={weekday} className="weekday">{weekday}</td>
    ));

    const days = this.getDays();
    const rows = [];
    let row = new Array();

    days.forEach((day, i) => {
      if (row.length < 7) {
        row.push(day);
      } else {
        rows.push(row);
        row = new Array();
        row.push(day);
      }

      if (i === days.length - 1) {
        rows.push(row);
      }
    });

    const slots = rows.map((row, i) => {
      return (
        <tr key={i} className={`row-${i + 1}`}>{row}</tr>
      )
    });

    return (
      <div className="container">
        <table className="calendar">
          <thead>
            <tr>
              <th>
                <i
                  className={`fas fa-caret-left`}
                  onClick={() => this.changeMonth(-1)}/>
                <i
                  className={`fas fa-caret-right`}
                  onClick={() => this.changeMonth(1)}/>
                  {this.months[this.state.month]}
              </th>
              <th>{this.state.year}</th>
            </tr>
          </thead>

          <tbody>
            <tr className="weekdays">{weekdays}</tr>
            {slots}
          </tbody>
        </table>
        {this.state.showIndexForm &&
          <EventIndexForm
            showForm={false}
            date={this.state.indexFormDate}/>}
      </div>
    )
  }
}
