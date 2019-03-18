class Question < ActiveRecord::Base
  before_save :update_index
  after_update :update_index

  validates_presence_of :index
  validates_presence_of :pregunta_es
  validates_presence_of :respuesta_es
  validates_presence_of :tipo

  private

  def update_index
    logger.debug self
    Question.where("index >= ? AND tipo = ? AND pregunta_es != ?", index, tipo, self.pregunta_es).each do |q|
      logger.debug "#{q.index} #{q.index + 1} #{q.pregunta_es}"
      #q.update(index: q.index)
    end
  end

end
