import { RECEIVE_EVENTS } from '../actions/event_actions';

const eventsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_EVENTS:
      return {};
    default:
      return oldState;
  }
};

export default eventsReducer;
