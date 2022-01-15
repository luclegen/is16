class ApplicationController < ActionController::API
  include ActionController::Cookies

  def index
    redirect_to ENV['WEB']
  end

  def authorize
    begin
        @user = User.find(JWT.decode(request.headers[:Authorization].split(' ')[1], ENV['SECRET'], true)[0]['id'])
    rescue => e
      render status: :unauthorized
    end
  end
end
