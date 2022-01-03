class AuthController < ApplicationController
  before_action :authorize, only: [:logout]

  def login
    if !(@user = User.where(email: params[:email]).first)
      render plain: 'Email not registered!', status: :not_found
    else
      if @user.authenticate(params[:password])
        cookies.encrypted.signed[:token] = { value: @user.sign, httponly: true, secure: ENV['RAILS_ENV'] == 'production' }
        cookies[:avatar] = @user.avatar
        cookies[:name] = @user.name
        cookies[:surname] = @user.surname
        render status: :created
      else
        render plain: 'Wrong password!', status: :unauthorized
      end
    end
  end

  def logout
    cookies.delete :token
    cookies.delete :avatar
    cookies.delete :name
    cookies.delete :surname
    render nothing: true
  end
end
