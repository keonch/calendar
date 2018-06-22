export async function fetchEvents(date) {
  let response = await fetch(`api/events?date=${date}`);
  let payload = await response.json();
  return payload;
};
