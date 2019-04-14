Rails.application.routes.draw do
  devise_for :admins, :controllers => { :registrations => "registrations", :sessions => "sessions"}
  resources :admins

  devise_scope :admin do
    get "/acceder" => "devise/sessions#new"
  end

  match "/404", :to => "errors#not_found", :via => :all
  match "/500", :to => "errors#internal_server_error", :via => :all
  get "/500_e", :to => "errors#internal_server_error"
  get "/404_e", :to => "errors#not_found"

  get 'panel/panel' => 'panel#panel', :as => :panel
  get 'panel/principal' => 'panel#principal', :as => :panel_princ
  get 'panel/index' => 'panel#index', :as => :panel_index
  post 'panel/index' => 'panel#index', :as => :panel_index_post
  get 'panel/generar' => 'panel#generar', :as => :panel_nuevo
  get 'panel/editar' => 'panel#editar', :as => :panel_editar
  post 'panel' => 'panel#crear'
  get 'panel/:id' => 'panel#mostrar', :as => :panel_mostrar
  delete 'panel/:id' => 'panel#eliminar', :as => :panel_eliminar
  put 'panel/editar' => 'panel#actualizar'
  patch 'panel/editar' => 'panel#actualizar'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".


  scope "(:locale)", locale: /(en)|(es)/ do
    get "sobre" => "informacion_general#sobre", :as => :sobre
    get "contacto" => "informacion_general#contacto", :as => :contacto
    post "enviar" => "informacion_general#enviar_mail", :as => :send_mail
    get "politica-administracion-publica" => "programas_academicos#programas", :as => :pap
    get "relaciones-internacionales" => "programas_academicos#programas", :as => :ri
    get "ciencia-politica" => "programas_academicos#programas", :as => :cp
    get 'cursos' => 'programas_academicos#cursos', :as => :cursos
    get 'cursos/:curso' => 'programas_academicos#curso', :as => :curso
    get 'cursos_:tipo' => 'programas_academicos#cursos_tipo', :as => :cursos_tipo
    get 'convocatorias' => "programas_academicos#convocatorias", :as => :convocatorias
    get 'aspirantes' => 'programas_academicos#aspirantes', :as => :aspirantes
    get 'preguntas-licenciatura' => 'programas_academicos#preguntas', :as => :preguntas_l
    get 'preguntas-maestria' => 'programas_academicos#preguntas', :as => :preguntas_m
    get 'personal-academico' => 'directorio#personal', :as => :personal_academico
    get 'personal-administrativo' => 'directorio#personal', :as => :personal_administrativo
    get 'agora' => 'revistas#revista', :as => :agora
    get 'foro-internacional' => 'revistas#revista', :as => :foro
    get 'estudiantes' => 'estudiantes#estudiantes', :as => :estudiantes
    post 'autenticar' => 'estudiantes#autenticar', :as => :autenticar
    get 'estudiantes/politica-administracion-publica' => 'estudiantes#interna', :as => :estudiantes_pap
    get 'estudiantes/relaciones-internacionales' => 'estudiantes#interna', :as => :estudiantes_ri
    get 'estudiantes/ciencia-politica' => 'estudiantes#interna', :as => :estudiantes_cp
    get 'rafael-segovia' => 'principal#rafael', :as => :rafael
  end

  get "/(:locale)", to: "principal#index", as: :main, locale: /(es)|(en)/
  # You can have the root of your site routed with "root"
  root 'principal#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
