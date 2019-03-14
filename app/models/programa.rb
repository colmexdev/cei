class Programa < ActiveRecord::Base

  validates_presence_of :titulo
  validates_presence_of :descripcion_es
  validates_presence_of :fecha_ic
  validates_presence_of :fecha_fc

end
