class ProgramasAcademicosController < ApplicationController

  def programas
    @titulo = (request.fullpath.include?("politica-administracion-publica") ? "pap" : (request.fullpath.include?("relaciones-internacionales") ? "ri" : "cp"))
    @grado = (request.fullpath.include?("ciencia-politica") ? "mt" : "lic")
    respond_to do |format|
      format.html render 'programas'
    end
  end

end
