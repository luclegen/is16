require 'bcrypt'

class Code
  include BCrypt
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  field :email, type: String
  field :code_digest, type: String
  field :attempts, type: Integer, default: 3

  validates :email, uniqueness: true, presence: { message: 'is required' }, format: { with: EMAIL_REGEX, message: "Invalid email" }

  def verify(code)
    self.attempts -= 1
    self.update
    Password.new(self[:code_digest]) == code
  end

  def code=(code)
    self[:code_digest] = Password.create(code)
  end
end
