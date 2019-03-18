class ProgramasAcademicosController < ApplicationController

  def programas
    @titulo = (request.fullpath.include?("administracion") ? "pap" : (request.fullpath.include?("internacionales") ? "ri" : "cp"))
    @grado = (request.fullpath.include?("ciencia") ? "mt" : "lic")
  end

  def aspirantes
    @link = 1
  end

  def preguntas
    @preguntas = Question.where("tipo = ?",(request.fullpath.include?("maestria") ? "Maestría" : "Licenciatura")).order(index: :asc)
    @link = (request.fullpath.include?("maestria") ? "3" : "2")
    respond_to do |format|
      format.html render 'aspirantes'
      format.js
    end
  end

  def cursos
  end

  def convocatorias
  end

end
