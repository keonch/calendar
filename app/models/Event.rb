class Event < ApplicationRecord
  validates :description, :start_time, :end_time, :user_id, presence: true

  belongs_to :user,
    class_name: :User,
    foreign_key: :user_id

  # SELECT "events".*
  # FROM "events"
  # WHERE (
  #   "events"."start_time" BETWEEN $1 AND $2
  #   OR
  #   "events"."end_time" BETWEEN $3 AND $4)

  def self.between_dates(from_date, to_date)
    self.where(start_time: from_date..to_date).or(
      self.where(end_time: from_date..to_date)
    )
  end

end
