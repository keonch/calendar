class Event < ApplicationRecord
  validates :description, :start_time, :end_time, presence: true
end
