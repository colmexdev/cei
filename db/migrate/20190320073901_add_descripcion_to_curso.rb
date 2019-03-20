class AddDescripcionToCurso < ActiveRecord::Migration
  def change
    add_column :cursos, :descripcion_en, :text
  end
end
