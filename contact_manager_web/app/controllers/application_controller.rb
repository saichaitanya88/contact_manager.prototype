class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  after_filter  :set_access_control_headers

  def set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, DELETE, PUT, PATCH, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, SessionToken'
  end  

  def base_url
    return ENV["BASE_URL"]
  end
  def port
    return ENV["PORT"]
  end
  def api_key
    return ENV["APIKEY"]
  end
  def api_secret
    return ENV["APISECRET"]
  end

  def option
    render json: 'test'
  end
end
