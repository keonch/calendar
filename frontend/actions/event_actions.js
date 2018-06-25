import * as APIUtils from '../utils/events_api_util';

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';

const receiveEvents = (payload) => {
  return ({
    type: RECEIVE_EVENTS,
    payload
  });
};

const receiveEvent = (payload) => {
  return ({
    type: RECEIVE_EVENT,
    payload
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
