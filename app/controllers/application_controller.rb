class ApplicationController < ActionController::Base

  # Assume user has already signed in
  # current_user helper method is made to repliate a session
  helper_method :current_user

  private
  def current_user
    @current_user = User.find_by(username: "GoodUser123")
  end

end
