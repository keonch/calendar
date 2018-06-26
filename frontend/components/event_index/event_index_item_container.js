import { connect } from 'react-redux';
import { deleteEvent } from '../../actions/event_actions';
import EventIndexItem from './event_index_item';

const mdp = (dispatch) => {
  return ({
    deleteEvent: (id) => dispatch(deleteEvent(id))
  });
};

export default connect(null, mdp)(EventIndexItem);
