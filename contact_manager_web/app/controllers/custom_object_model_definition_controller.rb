require "net/http"
require "uri"

class CustomObjectModelDefinitionController < ApplicationController
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  def search
    accountId = '5591e727366f7c6667610379'
    customObjectId = '559267d47ab85cc371d4da32'
    customObjectModelDefinitionId = '559267d47ab85cc371d4da34'
    path = "/application/account/#{accountId}/customObject/#{customObjectId}/modelDefinitions"
    token = 'r053rrnctc8r529'
    api_request = Net::HTTP::Get.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.add_field("Session-Token", token)
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    resp_body = JSON.pretty_generate(JSON.parse(api_response.body))
    render json: resp_body, :status => api_response.code, :message => api_response.message
  end

  def create
    accountId = '5591e727366f7c6667610379'
    customObjectId = '559267d47ab85cc371d4da32'
    credentials = { name: "alias", type: "String" }
    path =  "/application/account/#{accountId}/customObject/#{customObjectId}/modelDefinition"
    api_request = Net::HTTP::Post.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    token = 'r053rrnctc8r529'
    api_request.add_field("Session-Token", token)
    api_request.body = credentials.to_json
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    render json: api_response.body, :status => api_response.code, :message => api_response.message
  end

  def get
    accountId = '5591e727366f7c6667610379'
    customObjectId = '559267d47ab85cc371d4da32'
    customObjectModelDefinitionId = '559267d47ab85cc371d4da34'
    path = "/application/account/#{accountId}/customObject/#{customObjectId}/modelDefinition/#{customObjectModelDefinitionId}"
    token = 'r053rrnctc8r529'
    api_request = Net::HTTP::Get.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.add_field("Session-Token", token)
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    render json: api_response.body, :status => api_response.code, :message => api_response.message
  end

  def edit
    accountId = '5591e727366f7c6667610379'
    customObjectId = '559267d47ab85cc371d4da32'
    customObjectModelDefinitionId = '559277718de99b090a769469'
    query = { name: "alias2", type: "String" , description: "description for alias" }
    path =  "/application/account/#{accountId}/customObject/#{customObjectId}/modelDefinition/#{customObjectModelDefinitionId}"
    token = 'r053rrnctc8r529'
    api_request = Net::HTTP::Put.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.add_field("Session-Token", token)
    api_request.body = query.to_json
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    resp_body = JSON.pretty_generate(JSON.parse(api_response.body))
    render json: resp_body, :status => api_response.code, :message => api_response.message
  end

  def delete
    accountId = '5591e727366f7c6667610379'
    customObjectId = '559267d47ab85cc371d4da32'
    customObjectModelDefinitionId = '559277718de99b090a769469'
    path = "/application/account/#{accountId}/customObject/#{customObjectId}/modelDefinition/#{customObjectModelDefinitionId}"
    token = 'r053rrnctc8r529'
    api_request = Net::HTTP::Delete.new(path, initheader = {'Content-Type' =>'application/json'})
    api_request.basic_auth api_key, api_secret
    api_request.add_field("Session-Token", token)
    api_response = Net::HTTP.new(base_url, port).start {|http| http.request(api_request) }
    resp_body = JSON.pretty_generate(JSON.parse(api_response.body))
    render json: resp_body, :status => api_response.code, :message => api_response.message
  end

end

#   app.get('/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId', 
#     customObjectsAPI.GetCustomObjectModelFieldDefinition);
#   app.post('/application/account/:accountId/customObject/:customObjectId/modelDefinition', customObjectsAPI.CreateCustomObjectModelField);
#   app.put('/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId', 
#     customObjectsAPI.UpdateCustomObjectModelFieldDefinition);
#   app.delete('/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId', 
#     customObjectsAPI.DeleteCustomObjectModelFieldDefinition);