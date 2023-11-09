Rails.application.routes.draw do

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get "/me", to: "users#show"

  resources :events do
    resources :attendances, only: [:create, :update, :destroy]
  end

  # post '/events/:id/attendance', to: 'attendances#create'

  # get '/attendances', to: 'attendances#index'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end