import * as APIUtils from '../utils/events_api_util';

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';

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

const removeEvent = (eventId) => {
  return ({
    type: REMOVE_EVENT,
    eventId
  });
};

export const fetchAllEvents = () => {
  return (
    (dispatch) => {
      return (
        APIUtils.fetchAllEvents()
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

export const deleteEvent = (eventId) => {
  return (
    (dispatch) => {
      return (
        APIUtils.deleteEvent(eventId)
        .then((eventId) => dispatch(removeEvent(eventId)))
      );
    }
  );
};
