class Api::EventsController < ApplicationController
  # turn off csrf protection
  skip_before_action :verify_authenticity_token

  def index
    @events = Event.all
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

  def destroy
    event = Event.find(params[:id])
    if event
      event.destroy
      render json: event.id
    else
      render json: ["Not Found"], status: 404
    end
  end

  def update

    @event = Event.find(params[:id])
    if @event

      start_time = Time.parse(event_params[:startTime])
      end_time = Time.parse(event_params[:endTime])

      if @event.update(
        description: event_params[:description],
        start_time: start_time,
        end_time: end_time
      )
        render :show
      else
        render json: @event.errors.full_messages, status: 422
      end
    else
      render json: ["Not Found"], status: 404
    end
  end

  private
  def event_params
    params.require(:event).permit(:description, :startTime, :endTime)
  end

end
