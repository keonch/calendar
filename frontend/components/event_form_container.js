import { connect } from 'react-redux';
import EventForm from './event_form';
import { submitEvent } from '../actions/event_actions';

const msp = (state) => {
  return ({

  });
};

const mdp = (dispatch) => {
  return ({
    submitEvent: (data) => dispatch(submitEvent(data))
  });
};

export default connect(msp, mdp)(EventForm);
