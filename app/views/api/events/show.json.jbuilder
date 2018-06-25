json.event do
  json.set! @event.id do
    json.extract! @event, :description, :start_time, :end_time, :id
  end
end
