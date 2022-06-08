require 'date'

class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show]
  before_action :authorize, only: [:update]

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
            render plain: @code.attempts > 0 ? 'Wrong code! You have ' + @code.attempts.to_s + ' attempts left.' : 'Code is expired! Please try another code.', status: @code.attempts > 0 ? :unauthorized : :gone
          end
        else
          render plain: 'Code is expired! Please try another code.', status: :gone
        end
      else
        render plain: 'Code must be generated before registration!', status: :not_found
      end
    else
      render plain: 'Date of birth is required!', status: :bad_request
    end
  end

  def show
    if @profile
      @dob = Date.parse(@profile.dob.to_s)

      render json: {
        id: @user._id.to_s,
        avatar: @user.avatar,
        fullName: @profile.name,
        email: @user.email,
        dob: @dob,
        sex: @profile.sex
      }
    else
      render plain: 'Profile not found!', status: :not_found
    end
  end

  def update
    @user.avatar = params[:avatar]
    @user.name = params[:name]
    @user.surname = params[:surname]
    @user.email = params[:email]

    if !params[:password].to_s.strip.empty? && !params[:new_password].to_s.strip.empty?
      if @user.authenticate(params[:password])
        @user.password = params[:new_password]
      else
        return render plain: 'Wrong password!', status: :unauthorized
      end
    end

    @profile.name = params[:name] + ' ' + params[:surname]
    @profile.dob = Date.parse(params[:dob])
    @profile.sex = params[:sex]

    if @user.save && @profile.save
      render json: {
        avatar: @user.avatar,
        name: @user.name,
        surname: @user.surname
      }
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def index
    render json: Profile.where(name: Regexp.new(params[:name], Regexp::IGNORECASE)).map { |p| { _id: p._uid, name: p.name, avatar: User.find(p._uid).avatar } }
  end

  private
    def set_user
      begin
        @user = User.find(params[:id])
        @profile = Profile.where(_uid: @user).first
      rescue => e
        render plain: 'User not found!', status: :not_found
      end
    end

    def user_params
      params.require(:user).permit(:name, :surname, :email)
    end
end
