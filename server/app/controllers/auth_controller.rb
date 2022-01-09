class AuthController < ApplicationController
  before_action :verify, only: [:login, :available]
  before_action :authorize, only: [:logout]

  def login
    if @user
      if @user.authenticate(params[:password])
        cookies.encrypted.signed[:token] = { value: @user.sign, httponly: true }
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

  def available
    render status: @user ? :non_authoritative_information : :ok
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
