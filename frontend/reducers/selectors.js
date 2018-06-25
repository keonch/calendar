export const groupAndSortEvents = (events, year, month) => {
  const result = new Object();

  Object.values(events).forEach((event) => {
    const eventDate = new Date(Date.parse(event.startTime)),
          eventDay = eventDate.getDate(),
          eventMonth = eventDate.getMonth(),
          eventYear = eventDate.getFullYear()

    if (eventYear === year && eventMonth === month) {
      if (result[eventDay] !== undefined) {
        result[eventDay].push(event.id);
      } else {
        result[eventDay] = new Array();
        result[eventDay].push(event.id);
      }
    }
  });

  Object.values(result).forEach((day) => {
    day.sort(function(a, b) {
      const timeA = new Date(Date.parse(events[a].startTime)).getTime();
      const timeB = new Date(Date.parse(events[b].startTime)).getTime();
      if (timeA > timeB) {
        return 1;
      } else if (timeA <= timeB) {
        return -1;
      }
    });
  });

  return result;
};
