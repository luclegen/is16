class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_for Chat.find(params[:cid])
  end

  def received(data)
    ChatChannel.broadcast_to(@chat, { id: @chat._id.to_s })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
