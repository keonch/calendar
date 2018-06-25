class Api::EventsController < ApplicationController
  # turn off csrf protection
  skip_before_action :verify_authenticity_token

  def index
    date = Time.parse(params[:date])
    from_date = date.beginning_of_month
    to_date = date.end_of_month
    @events = Event.between_dates(from_date, to_date)
  end

  def create
    start_time = Time.parse(event_params[:startTime])
    end_time = Time.parse(event_params[:endTime])
    @event = Event.new(
      description: event_params[:description],
      start_time: start_time,
      end_time: end_time
    )
    if @event.save
      render :show
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  private
  def event_params
    params.require(:event).permit(:description, :startTime, :endTime)
  end

end
