class Api::AuthController < ApplicationController
  before_action :verify, only: [:login, :available]
  before_action :authorize, only: [:logout]

  def login
    if @user
      if @user.authenticate(params[:password])
        session[:token] = @user.sign

        render json: {
          id: @user._id.to_s,
          avatar: @user.avatar,
          name: @user.name,
          surname: @user.surname
        }
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
    clear_session

    render nothing: true
  end

  private
   def verify
     @user = User.where(email: params[:email]).first
   end
end
