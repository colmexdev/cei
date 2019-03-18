class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.text :pregunta_es
      t.text :pregunta_en
      t.text :respuesta_es
      t.text :respuesta_en
      t.integer :index
      t.text :tipo

      t.timestamps null: false
    end
  end
end
