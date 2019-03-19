class Curso < ActiveRecord::Base
  before_save :delete_imagen, if: -> { imagen_del == '1' }

  attr_accessor :imagen_del

  validates_presence_of :titulo
  validates_presence_of :fecha_i
  validates_presence_of :fecha_f

  has_attached_file :imagen, styles: {},
                    url: "/assets/imgs_cursos/:id/:style/:basename.:extension",
                    path: ":rails_root/public/assets/imgs_cursos/:id/:style/:basename.:extension",
                    default_url: "/vacio.png"
  validates_attachment_content_type :imagen, content_type: ['image/jpeg', 'image/png', 'image/jpg']

  protected

  def delete_imagen
    self.imagen = nil
  end

end
