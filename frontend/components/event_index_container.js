import { connect } from 'react-redux';
import EventIndex from './event_index';

const msp = (state, ownProps) => {
  const day = ownProps.date.getDate();
  const eventsArray = ownProps.getEventsArray(day);
  return ({
    events: state.entities.events,
    eventsArray
  });
};

const mdp = (dispatch) => {
  return ({

  });
};

export default connect(msp, mdp)(EventIndex);
