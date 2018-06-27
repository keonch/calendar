class ApplicationController < ActionController::Base
  private
  # Assume user has already signed in as "GoodUser123"
  # current_user is made to repliate a session
  def current_user
    @current_user =
    username = "GoodUser123"
    User.find_by(username: username) ||
    User.create(username: username)
  end

  def require_logged_in!
    unless current_user
      render json: ['must be logged in'], status: 401
    end
  end

end
