import { connect } from 'react-redux';
import { fetchEvents } from '../actions/event_actions';
import Calendar from './calendar';

const msp = (state) => {
  return ({

  });
}

const mdp = (dispatch) => {
  return ({
    fetchEvents: (date) => dispatch(fetchEvents(date))
  });
}

export default connect(msp, mdp)(Calendar);
