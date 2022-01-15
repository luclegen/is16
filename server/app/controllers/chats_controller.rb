class ChatsController < ApplicationController
  before_action :authorize, only: [:show, :update, :index]
  before_action :set_chat, only: [:show, :update]

  def show
    @users = @chat._uids
    render json: {
      _id: @chat._id,
      photo: @chat.photo,
      title: @chat.title ? @chat.title : @users
        .map { |u| User.find(u).name }
        .uniq
        .sort_by { |k, v| -k }
        .join(', '),
      messages: @chat._mids.map { |m|
        begin
          @message = Message.find(m)
          begin
            @sender = User.find(@message._uid)
            { _id: @message._id,
              avatar: @sender.avatar,
              name: @sender.name,
              unsent: @message.unsent,
              body: @message.unsent ? (@sender._id == @user._id ? 'You' : @sender.name) + @message.body : @message.body,
              time: @message.created_at,
              _uid: @sender._id }
          rescue => e
            return render plain: 'Sender not found!', status: :not_found
          end
        rescue => e
          return render plain: 'Message not found!', status: :not_found
        end
      }
    }
  end

  def update
    if params[:_uids].kind_of?(Array)
      unless @chat._aids.include?(@user._id)
        return render status: :unauthorized
      end

      @chat._uids = params[:_uids].map { |u|
        begin
          User.find(u)._id
        rescue => e
          return render plain: 'User not found!', status: :not_found
        end
      }
    end

    if !@chat._uids.include?(@chat._uid) && @user._id != @chat._uid
      return render status: :unauthorized
    end

    if params[:_aids].kind_of?(Array)
      unless @chat._aids.include?(@user._id)
        return render status: :unauthorized
      end

      @chat._aids = params[:_aids].map { |u|
        begin
          User.find(u)._id
        rescue => e
          return render plain: 'Admin not found!', status: :not_found
        end
      }
    end

    unless @chat._aids.include?(@chat._uid)
      return render status: :unauthorized
    end

    if @chat.update(chat_params)
      render json: @chat
    else
      render json: @chat.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @chat._aids.include?(@chat._uid)
      if @user._id == @chat._uid
        @chat.destroy
      else
        render status: :unauthorized
      end
    else
      if @chat._aids.include?(@user._id)
        @chat.destroy
      else
        render status: :unauthorized
      end
    end
  end

  def index
    render json: Chat.where(_uids: { '$in': [@user._id] })
  end

  private
    def set_chat
      begin
        @chat = Chat.find(params[:id])
        unless @chat._uids.include?(@user._id)
          return render status: :unauthorized
        end
      rescue => e
        return render plain: 'Chat not found!', status: :not_found
      end
    end

    def chat_params
      params.require(:chat).permit(:photo, :title)
    end
end
