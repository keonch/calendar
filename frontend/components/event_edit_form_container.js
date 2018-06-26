import { connect } from 'react-redux';
import EventForm from './event_form';
import { editEvent } from '../actions/event_actions';
import { parseTimeToSliderValue } from '../utils/time_util';

const msp = (state, ownProps) => {
  return ({
    description: ownProps.event.description,
    startTime: ownProps.event.startTime,
    endTime: ownProps.event.endTime,
    start: parseTimeToSliderValue(ownProps.event.startTime),
    end: parseTimeToSliderValue(ownProps.event.endTime),
    eventId: ownProps.event.id,
    type: "edit"
  });
};

const mdp = (dispatch) => {
  return ({
    editEvent: (data) => dispatch(editEvent(data))
  });
};

export default connect(msp, mdp)(EventForm);
