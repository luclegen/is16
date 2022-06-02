class MessagesChannel < ApplicationCable::Channel
  def subscribed
    @chat = Chat.find(params[:cid])
    stream_for @chat
  end

  def received(data)
    MessagesChannel.broadcast_to(@chat, { id: @chat._id.to_s })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end