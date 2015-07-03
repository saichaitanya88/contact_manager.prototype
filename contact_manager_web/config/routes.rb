Rails.application.routes.draw do

  root 'static#index'

  post '/application/account' => 'account#create'
  post '/application/account/signin' => 'account#login'
  get '/application/account/:accountId' => 'account#get'
  put '/application/account/:accountId' => 'account#edit'
  
  get '/application/account/:accountId/customObjects' => 'custom_object#search'
  post '/application/account/:accountId/customObject' => 'custom_object#create'
  get '/application/account/:accountId/customObject/:customObjectId' => 'custom_object#get'
  put '/application/account/:accountId/customObject/:customObjectId' => 'custom_object#edit'
  delete '/application/account/:accountId/customObject/:customObjectId' => 'custom_object#delete'
  
  get '/application/account/:accountId/customObject/:customObjectId/modelDefinitions' => 'custom_object_model_definition#search'
  post '/application/account/:accountId/customObject/:customObjectId/modelDefinition' => 'custom_object_model_definition#create'
  get '/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId' => 'custom_object_model_definition#get'
  put '/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId' => 'custom_object_model_definition#edit'
  delete '/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId' => 'custom_object_model_definition#delete'
  
  get '/application/account/:accountId/customObject/:customObjectId/data/search' => 'custom_object_data#search'
  post '/application/account/:accountId/customObject/:customObjectId/data' => 'custom_object_data#create'
  get '/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId' => 'custom_object_data#get'
  put '/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId' => 'custom_object_data#edit'
  delete '/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId' => 'custom_object_data#delete'



  get 'partials/accounts/new.html' => 'angular#accounts_new'
  get '/application/account/signin' => 'angular#accounts_signin'
  get '/application/account/:accountId' => 'angular#accounts_get'
  get '/application/account/:accountId/customObjects' => 'angular#custom_objects_search'
  get '/application/account/:accountId/customObject/:customObjectId' => 'angular#custom_objects_get'
  get '/application/account/:accountId/customObject/:customObjectId/modelDefinition' => 'angular#custom_object_model_definition_new'
  get '/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId' => 'angular#custom_object_model_definition_get'
  get '/application/account/:accountId/customObject/:customObjectId/data/search' => 'angular#custom_object_data_search'
  get '/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId' => 'angular#custom_object_data_get'
  get '/static/not-found' => 'angular#static_not_found'
end
