class ApplicationController < ActionController::API
  include ActionController::Cookies

  def index
    redirect_to ENV['WEB']
  end

  def authorize
    if session[:token]
      begin
        id = JWT.decode(session[:token], ENV['SECRET'], true)[0]['id']

        if !params[:id].to_s.strip.empty? && id == params[:id]
          return render status: :unauthorized
        end

        @user = User.find(id)
        @profile = Profile.where(_uid: @user).first
      rescue => e
        clear_session
        render status: :unauthorized
      end
    else
      clear_session
      render status: :unauthorized
    end
  end
end
