import React from 'react';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.date = new Date();

    this.state = {
      month: this.months[this.date.getMonth()],
      year: this.date.getFullYear()
    }
  }

  componentDidMount() {
    this.props.fetchEvents(this.date);
  }

  firstWeekday() {
    const firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    return firstDay.getDay();
  }

  render() {
    const weekdays = this.weekdays.map((weekday) => (
      <td key={ weekday }>{ weekday }</td>
    ));

    return (
      <table className="calendar">
        <thead>
          <tr>
            <th>{ this.state.month }</th>
            <th>{ this.state.year }</th>
          </tr>
        </thead>

        <tbody>
          <tr>{ weekdays }</tr>
        </tbody>
      </table>
    )
  }
}
