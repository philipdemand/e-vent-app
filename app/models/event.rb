class Event < ApplicationRecord
    has_many :attendances
    has_many :users, through: :attendances
    validates :title, presence: true, uniqueness: true
    validates :address, presence: true
    validates :details, presence: true
    validates :details, length: { minimum: 10 }

    def self.most_attended
        events = Event.all
        sorted = events.sort_by {|event| -event.attendances.length}
    end
end
