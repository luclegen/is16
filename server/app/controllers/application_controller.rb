class ApplicationController < ActionController::API
  include ActionController::Cookies

  def index
    redirect_to ENV['WEB']
  end

  def authorize
    begin
      id = JWT.decode(request.headers[:Authorization].split(' ')[1], ENV['SECRET'], true)[0]['id']
      if id == params[:id]
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
