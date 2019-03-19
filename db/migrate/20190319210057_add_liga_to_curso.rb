class AddLigaToCurso < ActiveRecord::Migration
  def change
    add_column :cursos, :liga, :text
  end
end
