Rails.application.routes.draw do

  root 'static#index'

  post '/application/account' => 'account#create'
  post '/application/account/signin' => 'account#login'
  get '/application/account/:accountId' => 'account#get'
  put '/application/account/:accountId' => 'account#edit'
  
  post '/application/account/:accountId/customObjects' => 'custom_object#search'
  post '/application/account/:accountId/customObject' => 'custom_object#create'
  get '/application/account/:accountId/customObject/:customObjectId' => 'custom_object#get'
  put '/application/account/:accountId/customObject/:customObjectId' => 'custom_object#edit'
  delete '/application/account/:accountId/customObject/:customObjectId' => 'custom_object#delete'
  
  get '/application/account/:accountId/customObject/:customObjectId/modelDefinitions' => 'custom_object_model_definition#search'
  post '/application/account/:accountId/customObject/:customObjectId/modelDefinition' => 'custom_object_model_definition#create'
  get '/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId' => 'custom_object_model_definition#get'
  put '/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId' => 'custom_object_model_definition#edit'
  delete '/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId' => 'custom_object_model_definition#delete'
  
  post '/application/account/:accountId/customObject/:customObjectId/data/search' => 'custom_object_data#search'
  post '/application/account/:accountId/customObject/:customObjectId/data' => 'custom_object_data#create'
  get '/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId' => 'custom_object_data#get'
  put '/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId' => 'custom_object_data#edit'
  delete '/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId' => 'custom_object_data#delete'

  get 'partials/accounts/new.html' => 'angular#accounts_new'
  get 'partials/accounts/signin.html' => 'angular#accounts_signin'
  get 'partials/accounts/get.html' => 'angular#accounts_get'
  get 'partials/customObjects/new.html' => 'angular#custom_objects_new'
  get 'partials/customObjects/search.html' => 'angular#custom_objects_search'
  get 'partials/customObjects/get.html' => 'angular#custom_objects_get'
  get 'partials/customObjects/modelDefinitions/new.html' => 'angular#custom_object_model_definition_new'
  get 'partials/customObjects/modelDefinitions/get.html' => 'angular#custom_object_model_definition_get'
  get 'partials/customObjects/data/search.html' => 'angular#custom_object_data_search'
  get 'partials/customObjects/data/new.html' => 'angular#custom_object_data_new'
  get 'partials/customObjects/data/get.html' => 'angular#custom_object_data_get'
  get 'partials/static/not-found.html' => 'angular#static_not_found'
  get 'partials/static/navbar.html' => 'angular#static_navbar'
  get 'partials/debug/scope-params.html' => 'angular#debug_scope_params'
  

# OPTIONS
  match '/application/account', to: 'application#option', via: [:options]
  match '/application/account/signin', to: 'application#option', via: [:options]
  match '/application/account/:accountId' , to: 'application#option', via: [:options]
  match '/application/account/:accountId/customObject', to: 'application#option', via: [:options]
  match '/application/account/:accountId/customObject/:customObjectId', to: 'application#option', via: [:options]
  match '/application/account/:accountId/customObjects', to: 'application#option', via: [:options]
  match '/application/account/:accountId/customObject/:customObjectId/modelDefinitions', to: 'application#option', via: [:options]
  match '/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId', to: 'application#option', via: [:options]
  match '/application/account/:accountId/customObject/:customObjectId/modelDefinition', to: 'application#option', via: [:options]
  match '/application/account/:accountId/customObject/:customObjectId/data', to: 'application#option', via: [:options]
  match '/application/account/:accountId/customObject/:customObjectId/data/search', to: 'application#option', via: [:options]
  match '/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId', to: 'application#option', via: [:options]

end
