class AddTipoToCurso < ActiveRecord::Migration
  def change
    add_column :cursos, :tipo, :text
  end
end
