class ProgramasAcademicosController < ApplicationController

  def pap
    @titulo = (current_page?("/politica-administracion-publica") ? "pap" : (current_page?("/relaciones-internacionales") ? "ri" : "cp"))
    @grado = (current_page?("/ciencia-politica") ? "mt" : "lic")
    respond_to do |format|
      format.html render 'programas'
    end
  end

end
