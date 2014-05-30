Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  get '/chats/new' => 'chats#new', as: 'new_chat'
  get '/chats/:id' => 'chats#show', as: 'chat'
end
