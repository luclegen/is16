class Message
  include Mongoid::Document
  include Mongoid::Timestamps

  include CryptoHelper

  field :body, type: String
  field :unsent, type: Boolean, default: false

  validates :body, presence: { message: 'is required' }

  belongs_to :user, foreign_key: :_uid
  belongs_to :chat, foreign_key: :_cid

  def body
    decrypt(self[:body])
  end
end
