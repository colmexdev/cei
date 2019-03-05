class ProgramasAcademicosController < ApplicationController

  def pap
    @titulo = (current_page?(/\/((en)|(es)\/)?politica-administracion-publica/) ? "pap" : (current_page?(/\/((en)|(es)\/)?relaciones-internacionales/) ? "ri" : "cp"))
    @grado = (current_page?(/\/((en)|(es)\/)?ciencia-politica/) ? "mt" : "lic")
    respond_to do |format|
      format.html render 'programas'
    end
  end

end
