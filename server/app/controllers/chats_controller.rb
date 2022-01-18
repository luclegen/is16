class ChatsController < ApplicationController
  before_action :authorize, only: [:show, :update, :index]
  before_action :set_chat, only: [:show, :update]

  def show
    @users = @chat._uids

    if @users.length < 3
      @receivers = @users.length == 1 ? @users : @users - [@user._id]
      if @receivers.length == 1
        begin
          @receiver = User.find(@receivers.first.to_s)
        rescue => e
          return render plain: 'Receiver not found!', status: :not_found
        end
        begin
          @profile = Profile.where(_uid: @receivers.first.to_s).first
        rescue => e
          return render plain: "Receiver's profile not found!", status: :not_found
        end
      end
    end

    render json: {
      _id: @chat._id,
      group: @chat.group,
      photo: @chat.photo || @receiver.avatar,
      title: @chat.title || @profile.name,
      messages: @chat._mids.map do |mid|
        begin
          @message = Message.find(mid)
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
      end,
      members: @chat._uids.map do |uid|
        begin
          @member = User.find(uid.to_s)
          {
            _id: @member._id,
            avatar: @member.avatar,
            name: (@member.name + ' ' + @member.surname),
            role: @member._id.to_s == @chat._uid.to_s ? 'Creator' : @chat._aids.include?(@member._id) ? 'Admin' : '',
          }
        rescue => e
          return render plain: 'Member not found!', status: :not_found
        end
      end
    }
  end

  def update
    if params[:users].kind_of?(Array)
      if (@chat._uids - params[:users].map { |u| BSON::ObjectId(u) }).include?(@user._id) || @chat._aids.include?(@user._id)
        @chat._uids = params[:users].map do |u|
          begin
            User.find(u)._id
          rescue => e
            return render plain: 'User not found!', status: :not_found
          end
        end
      else
        return render status: :unauthorized
      end
    end

    if !@chat._uids.include?(@chat._uid) && @user._id != @chat._uid
      return render status: :unauthorized
    end

    if params[:admins].kind_of?(Array)
      unless @chat._aids.include?(@user._id)
        return render status: :unauthorized
      end

      @chat._aids = params[:admins].map do |u|
        begin
          User.find(u)._id
        rescue => e
          return render plain: 'Admin not found!', status: :not_found
        end
      end
    end

    unless @chat._aids.include?(@chat._uid)
      return render status: :unauthorized
    end

    if params[:photo] && params[:title]
      @chat.photo = params[:photo]
      @chat.title = params[:title]
    end

    if @chat.update
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
    @chats = Array(Chat.where(_uids: { '$in': [@user._id] }))
    @chats = @chats.map do |c|
      if c._uids.length > 0
        begin
          @receiver = User.find(c._uids.length == 1 ? c._uids.first : (c._uids - [@user._id]).first)
          @profile = Profile.where(_uid: @receiver).first
          c.photo = c.photo || @receiver.avatar
          c.title = c.title || @profile.name
        rescue => e
          return render plain: 'Receiver not found!', status: :not_found
        end
      end
      c
    end
    render json: @chats
  end

  private
    def set_chat
      begin
        if Chat.all.length.zero?
          return render json: nil
        end

        @chat = params[:id] == 'null' ? Chat.all.first : Chat.find(params[:id])
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
