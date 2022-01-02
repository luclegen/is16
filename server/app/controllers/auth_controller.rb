require 'json'

class AuthController < ApplicationController
  def login
    @user = User.where(email: params[:email]).first
    if !@user
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
end
