import React from 'react';

export default class EventIndexForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      showForm: false
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return ({
      date: props.date
    });
  }

  renderForm() {
    return (
      <form>
        <label>Description<input type="text"/></label>
        <input type="submit"/>
        <div onClick={() => this.toggleForm()}>Cancel</div>
      </form>
    )
  }

  toggleForm() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.date.getDate()}</h1>
        <h1>{this.state.date.getMonth()}</h1>
        <h1>{this.state.date.getFullYear()}</h1>
        {
          this.state.showForm ?
          this.renderForm() :
          <div onClick={() => this.toggleForm()}>Create An Event</div>
        }
      </div>
    );
  }
}
