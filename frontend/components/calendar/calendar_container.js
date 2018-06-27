import { connect } from 'react-redux';
import { fetchAllEvents } from '../../actions/event_actions';
import { groupAndSortEvents } from '../../reducers/selectors';
import Calendar from './calendar';

const msp = (state) => {
  // groupAndSortEvents selector keys events by their month and year
  return ({
    events: state.entities.events,
    sortedEvents: groupAndSortEvents(state.entities.events)
  });
}

const mdp = (dispatch) => {
  return ({
    fetchAllEvents: (date) => dispatch(fetchAllEvents(date))
  });
}

export default connect(msp, mdp)(Calendar);
