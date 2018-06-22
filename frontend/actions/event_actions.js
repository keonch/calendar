import * as APIUtils from '../utils/events_api_util';

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

const receiveEvents = (payload) => {
  return ({
    type: RECEIVE_EVENTS,
    payload
  })
};

export const fetchEvents = (date) => {
  return(
    (dispatch) => {
      return (
        APIUtils.fetchEvents(date)
        .then((payload) => dispatch(receiveEvents(payload)))
      );
    }
  );
};
