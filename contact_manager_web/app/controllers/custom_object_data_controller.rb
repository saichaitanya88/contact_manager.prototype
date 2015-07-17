require "net/http"
require "uri"

class CustomObjectDataController < ApplicationController
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  def search
    accountId = request.params["accountId"]
    customObjectId = request.params["customObjectId"]
    customObjectData = request.params["custom_object_datum"]
    path = "/application/account/#{accountId}/customObject/#{customObjectId}/data/search"
    token = request.headers['SessionToken']
    api_request = Net::HTTP::Post.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.add_field("Session-Token", token)
    api_request.body = customObjectData.to_json
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    resp_body = JSON.pretty_generate(JSON.parse(api_response.body))
    render json: resp_body, :status => api_response.code, :message => api_response.message
  end

  def create
    accountId = request.params["accountId"]
    customObjectId = request.params["customObjectId"]
    customObjectData = request.params["custom_object_datum"]
    path =  "/application/account/#{accountId}/customObject/#{customObjectId}/data"
    api_request = Net::HTTP::Post.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    token = request.headers['SessionToken']
    api_request.add_field("Session-Token", token)
    api_request.body = customObjectData.to_json
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    resp_body = JSON.pretty_generate(JSON.parse(api_response.body))
    render json: resp_body, :status => api_response.code, :message => api_response.message
  end

  def get
    accountId = request.params["accountId"]
    customObjectId = request.params["customObjectId"]
    customObjectDataId = request.params["customObjectDataId"]
    path = "/application/account/#{accountId}/customObject/#{customObjectId}/data/#{customObjectDataId}"
    token = request.headers['SessionToken']
    api_request = Net::HTTP::Get.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.add_field("Session-Token", token)
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    resp_body = JSON.pretty_generate(JSON.parse(api_response.body))
    render json: resp_body, :status => api_response.code, :message => api_response.message
  end

  def edit
    accountId = request.params["accountId"]
    customObjectId = request.params["customObjectId"]
    customObjectDataId = request.params["customObjectDataId"]
    customObjectData = request.params["custom_object_datum"]
    path =  "/application/account/#{accountId}/customObject/#{customObjectId}/data/#{customObjectDataId}"
    token = request.headers['SessionToken']
    api_request = Net::HTTP::Put.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.add_field("Session-Token", token)
    api_request.body = customObjectData.to_json
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    resp_body = JSON.pretty_generate(JSON.parse(api_response.body))
    render json: resp_body, :status => api_response.code, :message => api_response.message
  end

  def delete
    accountId = request.params["accountId"]
    customObjectId = request.params["customObjectId"]
    customObjectDataId = request.params["customObjectDataId"]
    path = "/application/account/#{accountId}/customObject/#{customObjectId}/data/#{customObjectDataId}"
    token = request.headers['SessionToken']
    api_request = Net::HTTP::Delete.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.add_field("Session-Token", token)
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    resp_body = ''
    if (api_response.body != nil)
        resp_body = JSON.pretty_generate(JSON.parse(api_response.body))
    end
    render json: resp_body, :status => api_response.code, :message => api_response.message
  end

end