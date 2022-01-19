class Chat
  include Mongoid::Document
  include Mongoid::Timestamps

  include CryptoHelper

  field :photo, type: String, default: '#0000ff'
  field :title, type: String
  field :group, type: Boolean, default: false
  field :message, type: String
  field :_mids, type: Array, default: []
  field :_uids, type: Array, default: []
  field :_aids, type: Array, default: []

  validates :photo, format: { with: COLOR_REGEX, message: 'Invalid photo' }
  validates :_uids, length: { minimum: 1, message: 'The chat must have a minimum of users!' }

  belongs_to :user, foreign_key: :_uid

  def message
    self[:message] ? decrypt(self[:message]) : nil
  end

  def message=message
    self[:message] = message ? encrypt(message) : nil
  end
end
