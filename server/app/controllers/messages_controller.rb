class MessagesController < ApplicationController
  before_action :authorize, only: [:create]

  def create
    if params[:id]
      begin
        @chat = Chat.find(params[:id])
      rescue => e
        return render plain: 'Chat not found!', status: :not_found
      end

      if !@chat._uids.include?(@user._id)
        return render nothing: true, status: :unauthorized
      end
    else
      @chat = Chat.new
      @chat._uids.push(@user._id)
    end

    @message = Message.new(message_params)
    @message.user = @chat.user = @user
    @chat._mids.push(@message._id)

    if !params[:id] && params[:users].kind_of?(Array)
      params[:users].each do |u|
        begin
          @receiver = User.find(u)
          if !@chat._uids.include?(@receiver._id)
            @chat._uids.push(@receiver._id)
          end
        rescue => e
          return render plain: 'User not found!', status: :not_found
        end
      end
    end

    if @chat.save
      @message.chat = @chat
      if @message.save
        render status: :created
      else
        render json: @message.errors, status: :unprocessable_entity
      end
    else
      @message.destroy
      render json: @chat.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @message.unsent
      return render status: :forbidden
    else
      @message.body = ' unsent a message'
      @message.unsent = true
      if @message.save
        render nothing: true
      else
        render status: :expectation_failed
      end
    end
  end

  private
    def set_message
      begin
        @message = Message.find(params[:id])
        if @user._id != @message._uid
          return render status: :unauthorized
        end
      rescue => e
        return render plain: 'Message not found!', status: :not_found
      end
    end

    def message_params
      params.require(:message).permit(:body)
    end
end
