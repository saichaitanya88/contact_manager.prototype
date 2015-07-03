class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  
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
end
