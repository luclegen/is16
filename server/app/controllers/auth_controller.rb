class AuthController < ApplicationController
  before_action :authorize, only: [:logout]

  def login
    if (@user = User.where(email: params[:email]).first)
      if @user.authenticate(params[:password])
        cookies.encrypted.signed[:token] = { value: @user.sign, httponly: true, secure: ENV['RAILS_ENV'] == 'production' }
        cookies[:avatar] = @user.avatar
        cookies[:name] = @user.name
        cookies[:surname] = @user.surname
        render nothing: true
      else
        render plain: 'Wrong password!', status: :unauthorized
      end
    else
      render plain: 'Email not registered!', status: :not_found
    end
  end

  def logout
    cookies.delete :token
    cookies.delete :avatar
    cookies.delete :name
    cookies.delete :surname
    render nothing: true
  end

  private
   def verify
     @user = User.where(email: params[:email]).first
   end
end
