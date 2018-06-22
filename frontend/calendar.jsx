import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from './components/calendar';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Calendar /> , root);
});
