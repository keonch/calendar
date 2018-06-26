class User < ApplicationRecord
  validates :username, presence: true

  has_many :events,
    class_name: :Event,
    foreign_key: :user_id

end
