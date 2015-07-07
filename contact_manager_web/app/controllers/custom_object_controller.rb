require "net/http"
require "uri"

class CustomObjectController < ApplicationController
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  def search
    query = request.params["custom_object"]
    accountId = request.params["accountId"]
    path =  "/application/account/#{accountId}/customObjects?name=#{query[:name]}"
    token = request.headers['SessionToken']
    api_request = Net::HTTP::Get.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.add_field("Session-Token", token)
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    render json: api_response.body, :status => api_response.code, :message => api_response.message
  end

  def create
    accountId = request.params["accountId"]
    custom_object = request.params["custom_object"]
    path =  "/application/account/#{accountId}/customObject"
    api_request = Net::HTTP::Post.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    token = request.headers['SessionToken']
    api_request.add_field("Session-Token", token)
    api_request.body = custom_object.to_json
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    render json: api_response.body, :status => api_response.code, :message => api_response.message
  end

  def get
    accountId = request.params["accountId"]
    customObjectId = request.params["customObjectId"]
    path = "/application/account/#{accountId}/customObject/#{customObjectId}"
    token = request.headers['SessionToken']
    api_request = Net::HTTP::Get.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.add_field("Session-Token", token)
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    render json: api_response.body, :status => api_response.code, :message => api_response.message
  end

  def edit
    accountId = request.params["accountId"]
    customObjectId = '559267d47ab85cc371d4da32'
    custom_object = { name: "My CustomObject2" }
    path = "/application/account/#{accountId}/customObject/#{customObjectId}"
    token = request.headers['SessionToken']
    api_request = Net::HTTP::Put.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.add_field("Session-Token", token)
    api_request.body = custom_object.to_json
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    render json: api_response.body, :status => api_response.code, :message => api_response.message
  end

  def delete
    accountId = request.params["accountId"]
    customObjectId = '559267d47ab85cc371d4da32'
    path = "/application/account/#{accountId}/customObject/#{customObjectId}"
    token = request.headers['SessionToken']
    api_request = Net::HTTP::Delete.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.add_field("Session-Token", token)
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    render json: api_response.body, :status => api_response.code, :message => api_response.message
  end

end