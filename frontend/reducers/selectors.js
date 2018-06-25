export const groupAndSortEvents = (events) => {
  const result = new Object();

  Object.values(events).forEach((event) => {
    const eventDate = new Date(Date.parse(event.startTime)),
          eventDay = eventDate.getDate(),
          eventMonth = eventDate.getMonth(),
          eventYear = eventDate.getFullYear(),
          eventYearMonth = eventYear.toString().concat(eventMonth)

    if (result[eventYearMonth] === undefined) {
      result[eventYearMonth] = new Object();
      result[eventYearMonth][eventDay] = new Array();
      result[eventYearMonth][eventDay].push(event.id);

    } else if (result[eventYearMonth][eventDay] === undefined) {
      result[eventYearMonth][eventDay] = new Array();
      result[eventYearMonth][eventDay].push(event.id);

    } else {
      result[eventYearMonth][eventDay].push(event.id);
    }
  });

  Object.values(result).forEach((yearMonth) => {
    Object.values(yearMonth).forEach((day) => {
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
  });

  return result;
};
