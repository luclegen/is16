require 'rest-client'

class Api::CodesController < ApplicationController
  include GeneratorHelper

  def create
    if @code = Code.where(email: params[:email]).first
      @code.destroy
    end

    @code = Code.new(code_params)
    code = gen_code

    @code.code = code

    if @code.save
      begin
        render html: (RestClient.post ENV['MAILER'], {:email => @code.email, :title => 'Verify email', :code => code}, {:Authorization => "Bearer #{ENV['TOKEN']}"}), status: :created
      rescue => e
        @code.destroy
        render plain: 'Mailer server not started or crashed!', status: :service_unavailable
      end
    else
      render json: @code.errors, status: :unprocessable_entity
    end
  end

  private
    def code_params
      params.require(:code).permit(:email)
    end
end
