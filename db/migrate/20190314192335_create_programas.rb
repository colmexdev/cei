class CreateProgramas < ActiveRecord::Migration
  def change
    create_table :programas do |t|
      t.text :titulo
      t.text :descripcion_es
      t.text :descripcion_en
      t.date :fecha_ic
      t.date :fecha_fc

      t.timestamps null: false
    end
  end
end
