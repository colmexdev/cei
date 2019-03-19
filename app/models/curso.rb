class Curso < ActiveRecord::Base
  before_save :delete_imagen, if: -> { imagen_del == '1' }
  before_save :delete_documento, if: -> { documento_del == '1' }

  attr_accessor :imagen_del
  attr_accessor :documento_del

  validates_presence_of :titulo
  validates_presence_of :fecha_i
  validates_presence_of :fecha_f

  has_attached_file :imagen, styles: {},
                    url: "/assets/imgs_cursos/:id/:style/:basename.:extension",
                    path: ":rails_root/public/assets/imgs_cursos/:id/:style/:basename.:extension",
                    default_url: "/vacio.png"
  validates_attachment_content_type :imagen, content_type: ['image/jpeg', 'image/png', 'image/jpg']

  has_attached_file :documento, styles: {},
                    url: "/assets/docs_cursos/:id/:style/:basename.:extension",
                    path: ":rails_root/public/assets/docs_cursos/:id/:style/:basename.:extension",
                    default_url: "/vacio.png"
  validates_attachment_content_type :documento, content_type: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']

  protected

  def delete_imagen
    self.imagen = nil
  end

  def delete_documento
    self.documento = nil
  end

end
