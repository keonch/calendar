import React from 'react';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.date = new Date();

    this.state = {
      month: this.date.getMonth(),
      year: this.date.getFullYear()
    }
  }

  componentDidMount() {
    this.props.fetchEvents(this.date);
  }

  getDays() {
    const firstDay = new Date(this.state.year, this.state.month, 1).getDay();
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<td className="empty" key={ i }></td>)
    };
    const blankDays = days.length;
    const daysInMonth = new Date(this.state.year, this.state.month + 1, 0).getDate();
    for (let i = 0; i < daysInMonth; i++) {
      days.push(
        <td className="day" key={ i + blankDays }>{ i + 1 }</td>)
    }

    return days;
  }

  changeMonth(e, increment) {
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

  render() {
    const weekdays = this.weekdays.map((weekday) => (
      <td key={ weekday } className="weekday">{ weekday }</td>
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
        <tr key={ i }>{ row }</tr>
      )
    });

    return (
      <table className="calendar">
        <thead>
          <tr>
            <th>
              <i className={ `fas fa-caret-left` } onClick={ (e) => this.changeMonth(e, -1) }></i>
              { this.months[this.state.month] }
              <i className={ `fas fa-caret-right` } onClick={ (e) => this.changeMonth(e, 1) }></i>
            </th>
            <th>{ this.state.year }</th>
          </tr>
        </thead>

        <tbody>
          <tr className="weekdays">{ weekdays }</tr>
          { slots }
        </tbody>
      </table>
    )
  }
}
