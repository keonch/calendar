import React from 'react';
import { Provider } from 'react-redux';
import Calendar from './calendar/calendar_container';

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <Calendar />
    </Provider>
  );
};

export default Root;
