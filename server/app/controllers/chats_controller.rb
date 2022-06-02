class ChatsController < ApplicationController
  before_action :authorize, only: [:view, :show, :update, :index]
  before_action :set_chat, only: [:view, :show, :update]

  def view
    unless @chat._vids.include?(@user._id)
      @chat._vids.push(@user._id)
    end

    if @chat.save
      render nothing: true
    else
      render json: @chat.errors, status: unprocessable_entity
    end
  end

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
      photo: @chat.photo || (@receiver.nil? ? nil : @receiver.avatar),
      title: @chat.title || (@profile.nil? ? nil : @profile.name),
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
      message: @chat.unsent ? (@sender._id == @user._id ? 'You' : @sender.name) + @chat.message : @chat.message,
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
      @users = params[:users].uniq.map { |u| BSON::ObjectId(u) }
      @outsiders = @users.length > @chat._uids.length ? @users - @chat._uids : @chat._uids - @users

      if (@outsiders.include?(@user._id) && @outsiders.length == 1) || @chat._aids.include?(@user._id) && !@outsiders.include?(@chat._uid)
        @chat._uids = params[:users].uniq.map do |u|
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

    if params[:admins].kind_of?(Array)
      @outsiders = @chat._aids - params[:admins].uniq.map { |a| BSON::ObjectId(a) }

      if @chat._aids.include?(@user._id) && !@outsiders.include?(@chat._uid)
        @chat._aids = params[:admins].uniq.map do |u|
          begin
            User.find(u)._id
          rescue => e
            return render plain: 'Admin not found!', status: :not_found
          end
        end
      else
        return render status: :unauthorized
      end
    end

    if !params[:photo].to_s.strip.empty? && !params[:title].to_s.strip.empty?
      if @chat._aids.include?(@user._id)
        @chat.photo = params[:photo]
        @chat.title = params[:title]
      else
        return render status: :unauthorized
      end
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
    @chats = @chats.map do |c|
      if c.unsent
        @sender = User.find(c.unsent)
      end

      {
        _id: c._id,
        _mids: c._mids,
        _aids: c._aids,
        _vids: c._vids,
        _uid: c._uid,
        group: c.group,
        message: c.unsent ? (@sender._id == @user._id ? 'You' : @sender.name) + c.message : c.message,
        unsent: c.unsent,
        photo: c.photo,
        title: c.title
      }
    end

    render json: @chats
  end

  private
    def set_chat
      begin
        @chats = Chat.where(_uids: { '$in': [@user._id] })
        if @chats.length.zero?
          return render json: nil
        end

        @chat = params[:id] == 'null' ? @chats.first : Chat.find(params[:id])

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
