require 'bcrypt'
require 'jwt'

class User
  include BCrypt
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  field :avatar, type: String, default: '#000000'
  field :name, type: String
  field :surname, type: String
  field :email, type: String
  field :password_digest, type: String

  validates :name, presence: { message: 'is required' }, format: { with: NAME_REGEX, message: "Invalid first name" }
  validates :surname, presence: { message: 'is required' }, format: { with: SURNAME_REGEX, message: "Invalid last name" }
  validates :email, uniqueness: true, presence: { message: 'is required' }, format: { with: EMAIL_REGEX, message: "Invalid email" }
  validates :password, presence: { message: 'is required' }, on: :create, format: { with: STRONG_PASSWORD_REGEX, message: "Please choose a stronger password. Try a mix of letters, numbers, and symbols (minimum is 8 characters)" }

  has_secure_password

  def sign
    JWT.encode({ id: self[:id], name: self[:name] }, ENV['SECRET'])
  end
end
