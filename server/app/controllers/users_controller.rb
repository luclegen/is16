class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)
    @profile = Profile.new()
    if params[:year] && params[:month] && params[:day]
      if @code = Code.where(email: params[:email]).first
        if @code.attempts > 0
          if @code.verify(params[:code])
            begin
              @code.destroy
              @user.password = params[:password]

              @profile.name = @user.name + ' ' + @user.surname
              @profile.dob = DateTime.new(params[:year], params[:month], params[:day])
              @profile.sex = params[:sex]

              if @user.save
                @profile.user = @user
                if @profile.save
                  render plain: 'Registered successfully.', status: :created
                else
                  @user.destroy
                  render json: @profile.errors, status: :unprocessable_entity
                end
              else
                render json: @user.errors, status: :unprocessable_entity
              end
            rescue => e
              render plain: e.to_s.capitalize + '!', status: :bad_request
            end
          else
            render plain: @code.attempts > 0 ? 'Wrong code! You have ' + @code.attempts.to_s + ' attempts left.' : 'Code is expired! Please try another code', status: :unauthorized
          end
        else
          render plain: 'Code is expired! Please try another code', status: :unauthorized
        end
      else
        render plain: 'Code must be generated before registration!', status: :not_found
      end
    else
      render plain: 'Date of birth is required!', status: :bad_request
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    def set_user
      begin
        @user = User.find(params[:id])
      rescue => e
        render json: { err: 'User not found!' }, status: :not_found
      end
    end

    def user_params
      params.require(:user).permit(:name, :surname, :email)
    end
end
