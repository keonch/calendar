export async function fetchAllEvents() {
  let response = await fetch(`api/events`);
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

export async function deleteEvent(eventId) {
  let response = await fetch(`api/events/${eventId}`, {
    method: 'DELETE'
  });
  let payload = await response.json();
  return payload;
}

export async function editEvent(data) {
  let response = await fetch(`api/events/${data.event.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  let payload = await response.json();
  return payload;
}
