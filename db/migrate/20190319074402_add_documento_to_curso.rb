class AddDocumentoToCurso < ActiveRecord::Migration
  def change
    remove_column :cursos, :liga
    add_attachment :cursos, :documento
  end
end
