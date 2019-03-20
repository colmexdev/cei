class AddFechasToCurso < ActiveRecord::Migration
  def change
    add_column :cursos, :fecha_ic, :date
    add_column :cursos, :fecha_fc, :date
  end
end
