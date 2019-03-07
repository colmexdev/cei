class ProgramasAcademicosController < ApplicationController

  def programas
    @titulo = (request.fullpath.include?("administracion") ? "pap" : (request.fullpath.include?("internacionales") ? "ri" : "cp"))
    @grado = (request.fullpath.include?("ciencia") ? "mt" : "lic")
  end

  def cursos
  end

  def convocatorias
  end

end
