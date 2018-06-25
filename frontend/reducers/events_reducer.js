import merge from 'lodash/merge';

import {
  RECEIVE_EVENTS,
  RECEIVE_EVENT
} from '../actions/event_actions';

const eventsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case RECEIVE_EVENTS:
      return merge({}, oldState, action.events);
    case RECEIVE_EVENT:
      return merge({}, oldState, action.event);
    default:
      return oldState;
  }
};

export default eventsReducer;
