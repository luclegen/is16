class Profile
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :dob, type: Date
  field :sex, type: String

  validates :name, presence: { message: 'is required' }, format: { with: SURNAME_REGEX, message: 'Invalid Full name' }
  validates :dob, presence: { message: 'is required' }
  validates :sex, presence: { message: 'is required' }, inclusion: { in: ['Male', 'Female', 'Other'], message: "%{value} is a invalid sex" }

  belongs_to :user, foreign_key: :_uid
end
