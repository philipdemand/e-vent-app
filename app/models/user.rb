class User < ApplicationRecord
    has_many :attendances
    has_many :events, through: :attendances
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 8 }
    validate :password_complexity
    has_secure_password

    def self.most_attendances
      all_users = User.all
      sorted = all_users.sort_by { |user| -user.attendances.length }
      sorted.first
    end

    def atten_num
      self.attendances.length
    end

    private

    def password_complexity
      return unless password.present?
  
      unless password.match(/\d/)
        errors.add(:password, 'must contain at least one digit')
      end
  
      unless password.match(/[A-Z]/)
        errors.add(:password, 'must contain at least one uppercase letter')
      end
  
      unless password.match(/[a-z]/)
        errors.add(:password, 'must contain at least one lowercase letter')
      end
  
      unless password.match(/[\W_]/)
        errors.add(:password, 'must contain at least one special character')
      end
    end

end
