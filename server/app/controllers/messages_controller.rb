class MessagesController < ApplicationController
  before_action :authorize, only: [:create, :destroy]
  before_action :set_message, only: [:destroy]

  def create
    if params[:users].length < 1
      return render plain: 'Nobody to chat!', status: :not_found
    end

    if params[:id]
      begin
        @chat = Chat.find(params[:id])
      rescue => e
        return render plain: 'Chat not found!', status: :not_found
      end

      unless @chat._uids.include?(@user._id)
        return render nothing: true, status: :unauthorized
      end
    else
      @chat = Chat.new

      @chat._uids.push(@user._id)
      @chat._aids.push(@user._id)
    end

    @message = Message.new(message_params)
    @message.user = @chat.user = @user
    @chat.message = params[:body]
    @chat._mids.push(@message._id)

    unless params[:id]
      if params[:users].kind_of?(Array)
        params[:users].each do |u|
          begin
            @receiver = User.find(u)
            unless @chat._uids.include?(@receiver._id)
              @chat.photo = params[:users].length === 1 ? @receiver.avatar : @user.avatar
              @chat.title = params[:users].length === 1 ? @receiver.name : @user.name + "'s group"
              @chat._uids.push(@receiver._id)
            end
          rescue => e
            return render plain: 'User not found!', status: :not_found
          end
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
    if (@chat = Chat.find(@message._cid.to_s))
      if @message.unsent
        @chat._mids.delete(@message._id)

        if @chat._mids.last
          if (@chat_message = Message.find(@chat._mids.last.to_s))
            @chat.message = @chat_message.body
          else
            @chat.message = nil
          end
        else
          @chat.message = nil
        end

        if @chat.save && @message.destroy
          render nothing: true
        else
          render json: @chat.errors, status: :unprocessable_entity
        end
      else
        @chat.message = @message.body = ' unsent a message'
        @message.unsent = true
        if @chat.save && @message.save
          render nothing: true
        else
          render status: :expectation_failed
        end
      end
    else
      render plain: 'Chat not found!', status: :not_found
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
