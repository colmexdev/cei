class Personal < ActiveRecord::Base

  validates_presence_of :nombre
  validates_presence_of :correo
  validates_presence_of :area
  validates_presence_of :servicio

end
