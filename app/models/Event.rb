class Event < ApplicationRecord
  validates :description, :start_time, :end_time, presence: true

  def self.between_dates(from_date, to_date)
    self.where(start_time: from_date..to_date).or(
      self.where(end_time: from_date..to_date)
    )
    # SELECT "events".*
    # FROM "events"
    # WHERE (
    #   "events"."start_time" BETWEEN $1 AND $2
    #   OR
    #   "events"."end_time" BETWEEN $3 AND $4)
  end

end
