class MessagesController < ApplicationController
  before_action :authorize, only: [:create, :destroy]
  before_action :set_message, only: [:destroy]

  def create
    if params[:users] && params[:users].length < 1
      return render plain: 'Nobody to chat!', status: :not_found
    end

    if params[:id]
      begin
        @chat = Chat.find(params[:id])
      rescue => e
        return render plain: 'Chat not found!', status: :not_found
      end

      unless @chat._uids.include?(@user._id)
        return render status: :unauthorized
      end
    else
      @users = params[:users].push(@user._id.to_s).map { |id| BSON::ObjectId(id) }
      @chat = Chat.where(_uids: { '$in': @users }).to_a.find { |c| c._uids.all? { |u| @users.include?(u) } && c._uids.length == @users.length }
      params[:users].pop

      is_new = !@chat

      if is_new
        @chat = Chat.new

        @chat._uids.push(@user._id)
        @chat._aids.push(@user._id)
      end
    end

    @message = Message.new(message_params)
    @message.user = @chat.user = @user
    @chat.message = params[:body]
    @chat._mids.push(@message._id)

    if is_new
      if params[:users].kind_of?(Array)
        params[:users].each do |u|
          begin
            @receiver = User.find(u)
            unless @chat._uids.include?(@receiver._id)
              @chat.photo = params[:users].length === 1 ? nil : @user.avatar
              @chat.title = params[:users].length === 1 ? nil : @user.name + "'s group"
              @chat._uids.push(@receiver._id)
            end
            @chat.group = @chat._uids.length > 2
          rescue => e
            return render plain: 'User not found!', status: :not_found
          end
        end
      end
    end

    if @chat.save
      @message.chat = @chat
      if @message.save
        ChatsChannel.broadcast_to(@chat, { id: @chat._id.to_s })
        render plain: @chat._id.to_s, status: :created
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
          ChatsChannel.broadcast_to(@chat, { id: @chat._id.to_s })
          render nothing: true
        else
          render json: @chat.errors, status: :unprocessable_entity
        end
      else
        @chat.message = @message.body = ' unsent a message'
        @message.unsent = true
        if @chat.save && @message.save
          ChatsChannel.broadcast_to(@chat, { id: @chat._id.to_s })
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
