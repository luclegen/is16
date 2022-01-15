class Chat
  include Mongoid::Document
  include Mongoid::Timestamps

  include CryptoHelper

  field :photo, type: String, default: '#0000ff'
  field :title, type: String
  field :message, type: String
  field :_mids, type: Array, default: []
  field :_uids, type: Array, default: []
  field :_aids, type: Array, default: []

  validates :message, uniqueness: true, presence: { message: 'is required' }
  validates :_mids, length: { minimum: 1, message: 'The chat must have a minimum of messages!' }
  validates :_uids, length: { minimum: 1, message: 'The chat must have a minimum of users!' }

  belongs_to :user, foreign_key: :_uid

  def message
    decrypt(self[:message])
  end

  def message=message
    self[:message] = encrypt(message)
  end
end
