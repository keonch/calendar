import * as APIUtils from '../utils/events_api_util';

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

const receiveEvents = (payload) => {
  return ({
    type: RECEIVE_EVENTS,
    payload
  })
};

export const fetchEvents = (monthYear) => {
  return(
    (dispatch) => {
      return (
        APIUtils.fetchEvents(monthYear)
        .then((res) => res.json())
        .then((payload) => dispatch(receiveEvents(payload)))
      );
    }
  );
};
