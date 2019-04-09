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
    @link = @cursos.pluck(:tipo).uniq.reverse[0].parameterize.downcase
  end

  def curso
    @curso = Curso.where("lower(titulo) like ?", '%' + params[:curso].downcase + '%').first
  end

  def cursos_tipo
    @cursos = Curso.where("unaccent(array_to_string(string_to_array(lower(tipo),' '),'-')) = ?", params[:tipo])
    @link = params[:tipo]
    @cursos_ant = @cursos.where("fecha_i < ?", Date.today).order(fecha_i: :desc)
    @cursos_nxt = @cursos.where("fecha_i >= ?", Date.today).order(fecha_i: :asc)
    @texto = Texto.where("tags like '%Cursos públicos%'").first.public_send(params[:locale] == :es ? :texto_ES : :TEXTO_EN)
    respond_to do |format|
      format.html {render 'cursos'}
      format.js
    end
  end

  def convocatorias
  end

end
