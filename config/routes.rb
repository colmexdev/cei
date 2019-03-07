Rails.application.routes.draw do
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
    get 'convocatorias' => "programas_academicos#convocatorias", :as => :convocatorias
    get 'aspirantes' => 'programas_academicos#aspirantes', :as => :aspirantes
    get 'personal-academico' => 'directorio#personal', :as => :personal_academico
    get 'personal-administrativo' => 'directorio#personal', :as => :personal_administrativo
    get 'agora' => 'revistas#revista', :as => :agora
    get 'foro-internacional' => 'revistas#revista', :as => :foro
    get 'estudiantes' => 'estudiantes#estudiantes', :as => :estudiantes
    post 'autenticar' => 'estudiantes#autenticar', :as => :autenticar
    get 'estudiantes/politica-administracion-publica' => 'estudiantes#interna', :as => :estudiantes_pap
    get 'estudiantes/relaciones-internacionales' => 'estudiantes#interna', :as => :estudiantes_ri
    get 'estudiantes/ciencia-politica' => 'estudiantes#interna', :as => :estudiantes_cp
  end

  get "/:locale" => "principal#index", :as => :main
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
