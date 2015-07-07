require "net/http"
require "uri"

class AccountController < ApplicationController
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  def new
    render json: ENV["BASE_URL"]
  end

  def create
    credentials = request.params['account']
    #{ email: 'saichaitanya@gmail.com', password: '123123123123' , firstName: "Sai", lastName: "Chaitanya2"}
    #puts "ACCOUNT: #{}"
    path =  "/application/account"
    api_request = Net::HTTP::Post.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.body = credentials.to_json
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    render json: api_response.body, :status => api_response.code, :message => api_response.message
  end

  def login
    credentials = request.params['account']
    path =  "/application/account/signin"
    api_request = Net::HTTP::Post.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.body = credentials.to_json
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    render json: api_response.body, :status => api_response.code, :message => api_response.message
  end

  def get
    accountId = request.params['accountId']
    path = "/application/account/#{accountId}"
    token = request.headers['SessionToken']
    api_request = Net::HTTP::Get.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.add_field("Session-Token", token)
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    render json: api_response.body, :status => api_response.code, :message => api_response.message
  end

  def edit
    debugger
    accountId = request.params['accountId']
    credentials = request.params['account']
    path = "/application/account/#{accountId}"
    token = request.headers['SessionToken']
    api_request = Net::HTTP::Put.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.add_field("Session-Token", token)
    api_request.body = credentials.to_json
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    render json: api_response.body, :status => api_response.code, :message => api_response.message
  end

end