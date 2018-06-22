export const fetchEvents = (monthYear) => {
  return (
    fetch(`api/events?monthYear=${monthYear}`)
  );
};
