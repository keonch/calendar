import { connect } from 'react-redux';
import { fetchAllEvents } from '../actions/event_actions';
import Calendar from './calendar';

const msp = (state) => {
  return ({
    events: state.entities.events
  });
}

const mdp = (dispatch) => {
  return ({
    fetchAllEvents: (date) => dispatch(fetchAllEvents(date))
  });
}

export default connect(msp, mdp)(Calendar);
