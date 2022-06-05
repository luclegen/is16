class ApplicationController < ActionController::API
  include ActionController::Cookies

  def index
    redirect_to ENV['WEB']
  end

  def authorize
    begin
      if session[:token]
        id = JWT.decode(session[:token], ENV['SECRET'], true)[0]['id']

        if !params[:id].to_s.strip.empty? && id == params[:id]
          return render status: :unauthorized
        end

        @user = User.find(id)
        @profile = Profile.where(_uid: @user).first  
      else
        render status: :unauthorized
      end
    rescue => e
      render status: :unauthorized
    end
  end
end
