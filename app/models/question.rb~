class Question < ActiveRecord::Base
  before_save :update_index

  validates_presence_of :index
  validates_presence_of :pregunta_es
  validates_presence_of :respuesta_es
  validates_presence_of :tipo

  private

  def update_index
    Question.where("index = ? AND tipo = ? AND pregunta_es != ?", self.index, self.tipo, self.pregunta_es).each do |q|
      q.update(index: q.index + 1)
    end
  end

end
