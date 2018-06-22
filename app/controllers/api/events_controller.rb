class Api::EventsController < ApplicationController

  def index
    date = Date.parse(params[:date])
    from_date = date.beginning_of_month
    to_date = date.end_of_month
    @events = Event.between_dates(from_date, to_date)
  end

end
