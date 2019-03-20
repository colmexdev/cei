class ProgramasAcademicosController < ApplicationController

  def programas
    @titulo = (request.fullpath.include?("administracion") ? "pap" : (request.fullpath.include?("internacionales") ? "ri" : "cp"))
    @grado = (request.fullpath.include?("ciencia") ? "mt" : "lic")
  end

  def aspirantes
    @title = "Aspirantes - "
    @link = 1
  end

  def preguntas
    @title = "Preguntas frecuentes (" + (request.fullpath.include?("maestria") ?  "Maestría" : "Licenciatura") + ") - "
    @preguntas = Question.where("tipo = ?",(request.fullpath.include?("maestria") ? "Maestría" : "Licenciatura")).order(index: :asc).pluck(:pregunta_es, :respuesta_es)
    @link = (request.fullpath.include?("maestria") ? "3" : "2")
    respond_to do |format|
      format.html {render 'aspirantes'}
      format.js
    end
  end

  def cursos
    @cursos_ant = Curso.where("tipo = ? AND fecha_i < ?", "Público", Date.today).order(fecha_i: :desc, fecha_f: :desc)
  end

  def curso
    @curso = Curso.where("titulo = ?", params[:curso])
  end

  def convocatorias
  end

end
