json.event do
  json.set! @event.id do
    json.extract! @event, :description, :id
    json.startTime @event.start_time
    json.endTime @event.end_time
  end
end
