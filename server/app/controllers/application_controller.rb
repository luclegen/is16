class ApplicationController < ActionController::API
  include ActionController::Cookies

  def index
    render plain: 'Server started.'
  end

  def authorize
    if cookies.encrypted.signed[:token]
      begin
        @user = User.find(JWT.decode(cookies.encrypted.signed[:token], ENV['SECRET'], true)[0]['id'])
      rescue => e
        render status: :unauthorized
      end
    else
      render status: :unauthorized
    end
  end
end
