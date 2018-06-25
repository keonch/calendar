export const groupAndSortDays = (events) => {
  const result = new Object();

  Object.values(events).forEach((event) => {
    const day = new Date(Date.parse(event.startTime)).getDate();
    if (result[day] !== undefined) {
      result[day].push(event.id);
    } else {
      result[day] = new Array();
      result[day].push(event.id);
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
