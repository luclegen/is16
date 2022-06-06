class TopChannel < ApplicationCable::Channel
  def subscribed
    stream_for Top.first
  end

  def received(data)
    TopChannel.broadcast_to(@top, { _cid: @top._cid, _uids: @top._uids })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
