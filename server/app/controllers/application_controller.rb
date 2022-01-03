class ApplicationController < ActionController::API
  include ActionController::Cookies

  def authorize
    if cookies.encrypted.signed[:token]
      begin
        @user = User.find(JWT.decode(cookies.encrypted.signed[:token], ENV['SECRET'], true)[0]['id'])
      rescue => exception
        render status: :unauthorized
      end
    else
      render status: :unauthorized
    end
  end
end
