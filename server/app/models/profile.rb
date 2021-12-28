class Profile
  include Mongoid::Document

  field :name, type: String
  field :dob, type: Date
  field :sex, type: String

  validates :name, presence: { message: 'is required' }, format: { with: SURNAME_REGEX, message: 'Invalid Full name' }
  validates :dob, presence: { message: 'is required' }
  validates :sex, presence: { message: 'is required' }, :inclusion => {:in => [ 'Male', 'Female', 'Other' ], message: "%{value} is not a valid sex" }

  belongs_to :user, foreign_key: :_uid
end
