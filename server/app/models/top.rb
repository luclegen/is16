class Top
  include Mongoid::Document

  field :_cid, type: BSON::ObjectId
  field :_uids, type: Array

  validates :_cids, length: { minimum: 1, message: 'The chat must have a minimum of chats!' }
end
