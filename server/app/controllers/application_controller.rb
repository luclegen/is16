class ApplicationController < ActionController::API
  include ActionController::Cookies

  def index
    redirect_to ENV['WEB']
  end

  def authorize
    begin
      id = JWT.decode(request.headers[:Authorization].split(' ')[1], ENV['SECRET'], true)[0]['id']

      if !params[:id].to_s.strip.empty? && id == params[:id]
        return render status: :unauthorized
      end

      @user = User.find(id)
      @profile = Profile.where(_uid: @user).first
    rescue => e
      render status: :unauthorized
    end
  end
end
