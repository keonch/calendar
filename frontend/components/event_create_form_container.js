import { connect } from 'react-redux';
import EventForm from './event_form';
import { submitEvent } from '../actions/event_actions';

const msp = (state, ownProps) => {
  const description = "",
        date = ownProps.date,
        startTime = date,
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          23, 59, 59, 999
        );
  return ({
    description,
    startTime,
    endTime,
    start: 10.0,
    end: 24.4,
    type: "create"
  });
};

const mdp = (dispatch) => {
  return ({
    submitEvent: (data) => dispatch(submitEvent(data))
  });
};

export default connect(msp, mdp)(EventForm);
