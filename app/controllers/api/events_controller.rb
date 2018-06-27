class Api::EventsController < ApplicationController
  # Turn off csrf protection for demo purposes
  skip_before_action :verify_authenticity_token

  # To access any action, assume user must be logged in
  before_action :require_logged_in!

  # Demo user - current_user is made in application_controller
  # to replicate a user session.
  # Assume events can only be fetched and changed by their author.

  def index
    @events = Event.where(user_id: current_user.id)
  end


  def create
    # Normalize time params to UTC format
    start_time = Time.parse(event_params[:startTime])
    end_time = Time.parse(event_params[:endTime])
    @event = Event.new(
      description: event_params[:description],
      start_time: start_time,
      end_time: end_time,
      user_id: current_user.id
    )

    if @event.save
      render :show

    else
      render json: @event.errors.full_messages, status: 422
    end
  end


  def destroy
    event = Event.find(params[:id])

    # Check if user is author of event
    if event.user_id != current_user.id
      render json: ["You do not have that privilege"], status: 403

    elsif event.user_id == current_user.id
      event.destroy
      render json: event.id

    else
      render json: ["Not Found"], status: 404
    end
  end


  def update
    @event = Event.find(params[:id])

    # Likewise with #destroy check if user is owner of the event
    if @event.user_id != current_user.id
      render json: ["You do not have that privilege"], status: 403

    elsif @event.user_id == current_user.id
      # Normalize times to UTC format
      start_time = Time.parse(event_params[:startTime])
      end_time = Time.parse(event_params[:endTime])
      if @event.update(
        description: event_params[:description],
        start_time: start_time, end_time: end_time
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
    params.require(:event)
    .permit(:description, :startTime, :endTime, :user_id)
  end

end
