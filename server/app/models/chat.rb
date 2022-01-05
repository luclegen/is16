class Chat
  include Mongoid::Document
  include Mongoid::Timestamps

  field :photo, type: String
  field :title, type: String
  field :_mids, type: Array, default: []
  field :_uids, type: Array, default: []

  validates :_mids, length: { minimum: 1, message: 'The chat must have a minimum of messages!' }
  validates :_uids, length: { minimum: 1, message: 'The chat must have a minimum of users!' }
end
