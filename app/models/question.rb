class Question < ActiveRecord::Base
  before_save :update_index
  before_update :update_index

  validates_presence_of :index
  validates_presence_of :pregunta_es
  validates_presence_of :respuesta_es
  validates_presence_of :tipo

  private

  def update_index
    Question.where("index >= ? AND tipo = ?", self.index, self.tipo).each do |q|
      q.update(index: q.index + 1)
    end
  end

end
