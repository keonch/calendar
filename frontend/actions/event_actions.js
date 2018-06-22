import * as APIUtils from '../utils/events_api_util';

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

export const fetchEvents = (monthYear) => {
  return(
    (dispatch) => {
      return (
        APIUtils.fetchEvents(monthYear)
        .then((payload) => dispatch(fetchEvents(payload)))
      );
    }
  );
};
