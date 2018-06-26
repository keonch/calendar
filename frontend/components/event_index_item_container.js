import { connect } from 'react-redux';
import { deleteEvent } from '../actions/event_actions';
import EventIndexItem from './event_index_item';

const msp = (state) => {
  return ({

  });
};

const mdp = (dispatch) => {
  return ({
    deleteEvent: (id) => dispatch(deleteEvent(id))
  });
};

export default connect(msp, mdp)(EventIndexItem);
