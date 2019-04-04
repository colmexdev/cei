class Gallery < ApplicationRecord

  has_attached_file :imagen, styles: {},
                    url: "/assets/galeria/:id/:style/:basename_s.:extension",
                    path: ":rails_root/public/assets/galeria/:id/:style/:basename_s.:extension",
                    default_url: "/vacio.png"
  validates_attachment_content_type :imagen, content_type: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
  validates_attachment_presence :imagen
end
