import * as APIUtils from '../utils/events_api_util';

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';

const receiveEvents = ({ events }) => {
  return ({
    type: RECEIVE_EVENTS,
    events
  });
};

const receiveEvent = ({ event }) => {
  return ({
    type: RECEIVE_EVENT,
    event
  });
};

export const fetchEvents = (date) => {
  return (
    (dispatch) => {
      return (
        APIUtils.fetchEvents(date)
        .then((payload) => dispatch(receiveEvents(payload)))
      );
    }
  );
};

export const submitEvent = (data) => {
  return (
    (dispatch) => {
      return (
        APIUtils.postEvent(data)
        .then((payload) => dispatch(receiveEvent(payload)))
      );
    }
  );
};
