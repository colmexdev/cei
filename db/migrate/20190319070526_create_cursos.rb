class CreateCursos < ActiveRecord::Migration
  def change
    create_table :cursos do |t|
      t.text :titulo
      t.text :liga
      t.text :imparte
      t.text :liga_imparte
      t.date :fecha_i
      t.date :fecha_f
      t.text :descripcion
      t.attachment :imagen

      t.timestamps null: false
    end
  end
end
