class CreateTextos < ActiveRecord::Migration[5.0]
  def change
    create_table :textos do |t|
      t.text :texto_es
      t.text :texto_en
      t.text :tags

      t.timestamps
    end
  end
end
