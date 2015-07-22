class AngularController < ApplicationController

  def accounts_new
    render '/partials/accounts/new'
  end

  def accounts_signin
    render '/partials/accounts/signin'
  end

  def accounts_get
    render '/partials/accounts/get'
  end

  def custom_objects_search
    render '/partials/custom_objects/search'
  end

  def custom_objects_new
    render '/partials/custom_objects/new'
  end

  def custom_objects_get
    render '/partials/custom_objects/get'
  end

  def custom_object_model_definition_new
    render '/partials/custom_objects/model_definition/new'
  end

  def custom_object_model_definition_get
    render '/partials/custom_objects/model_definition/get'
  end

  def custom_object_data_new
    render '/partials/custom_objects/data/new'
  end

  def custom_object_data_search
    render '/partials/custom_objects/data/search'
  end

  def custom_object_data_get
    render '/partials/custom_objects/data/get'
  end

  def static_not_found
    render '/static/not-found'
  end

  def static_navbar
    render '/static/navbar'
  end

  def debug_scope_params
    render '/partials/debug/scope-params'
  end
end