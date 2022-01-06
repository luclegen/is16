class ChatsController < ApplicationController
  private
    def set_chat
      begin
        @chat = Chat.find(params[:id])
        if !@chat._uids.include?(@user._id)
          return render status: :unauthorized
        end
      rescue => e
        return render plain: 'Chat not found!', status: :not_found
      end
    end
end
