import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

import Calendar from './components/calendar_container';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Calendar store={ configureStore() }/> ,
    document.getElementById('root')
  );
});
