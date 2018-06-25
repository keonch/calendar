export async function fetchEvents(date) {
  let response = await fetch(`api/events?date=${date}`);
  let payload = await response.json();
  return payload;
};

export async function postEvent(data) {
  let response = await fetch(`api/events`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  let payload = await response.json();
  return payload;
};
