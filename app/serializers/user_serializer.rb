class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :attendances
  has_many :attendances
  has_many :events, through: :attendances
end
