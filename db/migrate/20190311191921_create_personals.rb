class CreatePersonals < ActiveRecord::Migration
  def change
    create_table :personals do |t|
      t.text :nombre
      t.text :extension
      t.text :correo
      t.text :servicio
      t.text :area

      t.timestamps null: false
    end
  end
end
