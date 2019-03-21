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
    @cursos = Curso.all
  end

  def curso
    @curso = Curso.where("lower(titulo) like ?", '%' + params[:curso].downcase + '%').first
  end

  def cursos_tipo
    @cursos = Curso.where("unaccent(lower(tipo)) = ?", params[:tipo])
    respond_to do |format|
      format.html {render 'cursos'}
      format.js
    end
  end

  def convocatorias
  end

end
